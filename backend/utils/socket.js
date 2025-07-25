// socket/index.js
import { Server } from "socket.io";
import crypto from "crypto";
import { Chatstore } from "../models/chat.js";
import { Connectionreq } from "../models/connectionreq.js";
import dotenv from "dotenv";

dotenv.config();

const generateRoomId = (userId1, userId2) => {
  return crypto
    .createHash("sha256")
    .update([userId1, userId2].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = new Server(server, {
    path: "/api/socket.io",
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinChat", ({ firstName, userId, targetuserid }) => {
      const room = generateRoomId(userId, targetuserid);
      console.log(`${firstName} joined room ${room}`);
      socket.join(room);
    });

    socket.on("sendMessage", async ({ firstName, userId, targetuserid, text }) => {
      const room = generateRoomId(userId, targetuserid);
      console.log(`${firstName}: ${text}`);

      try {
        const existingreq = await Connectionreq.findOne({
          $or: [
            { fromUserId: userId, toUserId: targetuserid, status: "accepted" },
            { fromUserId: targetuserid, toUserId: userId, status: "accepted" }
          ]
        });

        if (!existingreq) {
          return socket.emit("error", { message: "You are not connected with this user." });
        }

        let chat = await Chatstore.findOne({
          participants: { $all: [userId, targetuserid] }
        });

        if (!chat) {
          chat = new Chatstore({
            participants: [userId, targetuserid],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();

        io.to(room).emit("Message Recieved", { firstName, text });
      } catch (error) {
        console.error("Error in sendMessage:", error);
        socket.emit("error", { message: "Internal server error" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

export default initializeSocket;
