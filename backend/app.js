import express from 'express';
import {connection} from "./config/database.js"
import cookieParser from "cookie-parser";
import registerrouter from "./routes/user.js"
import statusrouter from "./routes/request.js";
import Userreqrouter from "./routes/Userdata.js"
import paymentrouter from "./routes/Payment.js"
import http from "http"
import cors from "cors"; // Import cors
import intializesocket from "./utils/socket.js"
import chatrouter from "./routes/Chat.js"



import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file



const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL, // Frontend ka URL
    credentials: true,  // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(cookieParser());




connection();


app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
});


app.use('/',registerrouter);

app.use('/req', statusrouter);

app.use("/userdata",Userreqrouter);

app.use("/payment",paymentrouter);


app.use("/chat",chatrouter);


//create a server for websocket
const server=http.createServer(app)
intializesocket(server);



const PORT=process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
