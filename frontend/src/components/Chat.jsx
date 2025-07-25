import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { Base_url } from "../utils/helper";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const { targetuserid } = useParams();
  const user = useSelector((store) => store.user.user);
  const userId = user?._id;
  const isCurrentUserPremium = user?.isPremium;

  const [targetUser, setTargetUser] = useState({
    isPremium: false,
    firstName: "",
    lastName: "",
    photoUrl: ""
  });
  const [loading, setLoading] = useState(true);
  const [chatAllowed, setChatAllowed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchTargetUserPremiumStatus = async () => {
    try {
      const res = await axios.get(`${Base_url}/chat/checkpremium/${targetuserid}`, {
        withCredentials: true,
      });

      if (res.data) {
        setTargetUser({
          isPremium: res.data.isPremium,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          photoUrl: res.data.photoUrl || ""
        });
        
        // Check if both users are premium
        setChatAllowed(isCurrentUserPremium && res.data.isPremium);
      }
    } catch (error) {
      console.error("Error fetching target user status:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatmessages = async () => {
    if (!chatAllowed) return;
    
    try {
      const res = await axios.get(`${Base_url}/chat/store/${targetuserid}`, {
        withCredentials: true,
      });
      
      const chatmessages = res?.data?.messages.map((msg) => ({
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg.text,
        photoUrl: msg?.senderId?.photoUrl
      }));
      
      setMessages(chatmessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchTargetUserPremiumStatus();
  }, [targetuserid]);

  useEffect(() => {
    if (chatAllowed) {
      fetchChatmessages();
    }
  }, [targetuserid, chatAllowed]);

  useEffect(() => {
    if (!userId || !chatAllowed) return;
    
    const newSocket = createSocketConnection();
    setSocket(newSocket);

    newSocket.emit("joinChat", { 
      firstName: user.firstName, 
      userId, 
      targetuserid 
    });

    newSocket.on("Message Recieved", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, targetuserid, chatAllowed]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageHandler = () => {
    if (!newMessage.trim() || !socket || !chatAllowed) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetuserid,
      text: newMessage,
      photoUrl: user.photoUrl
    });

    setNewMessage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!isCurrentUserPremium) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 pt-7">
        <FaUserCircle className="text-9xl text-indigo-600 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2 ">
          Premium Membership Required
        </h1>
        <p className="text-gray-700 max-w-md text-center font-bold">
          You need to be a premium member to access the chat feature. Please upgrade your membership to start chatting.
        </p>
      </div>
    );
  }

  if (!targetUser.isPremium) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="relative pt-7">
          {targetUser.photoUrl ? (
            <img 
              src={targetUser.photoUrl} 
              alt={targetUser.firstName}
              className="w-36 h-36 rounded-full object-cover border-4 border-indigo-200"
            />
          ) : (
            <FaUserCircle className="text-9xl text-indigo-600" />
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">
          Cannot Start Chat
        </h1>
        <p className="text-gray-700 max-w-md text-center">
          {targetUser.firstName} {targetUser.lastName} doesn't have a premium membership yet. 
          They need to upgrade to premium to enable chatting with you.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-5 flex items-center space-x-4 border-b border-gray-300 mt-10">
        {targetUser.photoUrl ? (
          <img 
            src={targetUser.photoUrl} 
            alt={targetUser.firstName}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400"
          />
        ) : (
          <FaUserCircle className="text-5xl text-indigo-600" />
        )}
        <div>
          <p className="text-xl font-semibold text-gray-900">
            {targetUser.firstName} {targetUser.lastName}
          </p>
          <p className="text-sm text-green-600 font-medium">Active now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-white">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const isOwn = msg.firstName === user.firstName;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`flex max-w-xl ${
                  isOwn ? "ml-auto justify-end" : "mr-auto justify-start"
                }`}
              >
                {!isOwn && msg.photoUrl && (
                  <div className="flex-shrink-0 mr-3">
                    <img
                      src={msg.photoUrl}
                      alt={msg.firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`rounded-lg px-5 py-3 shadow-lg max-w-full break-words ${
                    isOwn
                      ? "bg-indigo-100 text-gray-900 rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {!isOwn && (
                    <div className="font-semibold mb-1">
                      {msg.firstName}
                    </div>
                  )}
                  <div>{msg.text}</div>
                </div>
                {isOwn && user.photoUrl && (
                  <div className="flex-shrink-0 ml-3">
                    <img
                      src={user.photoUrl}
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-indigo-100 p-4 flex items-center space-x-3 border-t border-indigo-300">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-3 rounded-full border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          onKeyDown={(e) => e.key === "Enter" && sendMessageHandler()}
        />
        <motion.button
          onClick={sendMessageHandler}
          whileHover={{ scale: 1.1, backgroundColor: "#4c51bf" }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
          aria-label="Send message"
        >
          Send
        </motion.button>
      </div>
    </div>
  );
};

export default Chat;