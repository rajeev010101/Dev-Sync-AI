// Load environment variables first
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDatabase from "./database/connectDatabase.js";

import {
  registerNotificationSocket
} from "./modules/notifications/notification.socket.js";

import "./workers/index.js";

console.log("PORT:", process.env.PORT);
console.log("CLIENT_URL:", process.env.CLIENT_URL);
console.log(
  "OPENAI KEY EXISTS:",
  !!process.env.OPENAI_API_KEY
);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Database Connection
    await connectDatabase();

    // Create HTTP Server
    const server = http.createServer(app);

    // Initialize Socket.IO
    const io = new Server(server, {
      cors: {
        origin:
          process.env.CLIENT_URL ||
          "http://localhost:5173",
        credentials: true
      }
    });

    // Register socket modules
    registerNotificationSocket(io);

    // Make io available everywhere
    app.set("io", io);

    // Base connection listener
    io.on("connection", (socket) => {
      console.log(
        `Socket Connected: ${socket.id}`
      );

      socket.on("disconnect", () => {
        console.log(
          `Socket Disconnected: ${socket.id}`
        );
      });
    });

    // Start Server
    server.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server Startup Error:",
      error
    );

    process.exit(1);
  }
};

startServer();