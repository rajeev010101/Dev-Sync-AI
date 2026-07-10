// Load environment variables first
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDatabase from "./database/connectDatabase.js";

import {
  registerNotificationSocket,
} from "./modules/notifications/notification.socket.js";
import { registerAISocket } from "./socket/ai.socket.js";

import startSchedulers from "./scheduler/index.js";

// Starts all BullMQ workers
import "./workers/index.js";

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🚀 DevSync AI Backend Starting...");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("PORT:", process.env.PORT);
console.log("CLIENT_URL:", process.env.CLIENT_URL);
console.log(
  "OPENAI KEY EXISTS:",
  !!process.env.OPENAI_API_KEY
);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    /**
     * Database
     */
    await connectDatabase();

    /**
     * HTTP Server
     */
    const server = http.createServer(app);

    /**
     * Socket.IO
     */
    const io = new Server(server, {
      cors: {
        origin:
          process.env.CLIENT_URL ||
          "http://localhost:5173",
        credentials: true,
      },
    });

    /**
     * Register Socket Modules
     */
    registerNotificationSocket(io);
    registerAISocket(io);

    /**
     * Make Socket.IO globally available
     */
    app.set("io", io);

    /**
     * Base Socket Events
     */
    io.on("connection", (socket) => {
      console.log(
        `✅ Socket Connected: ${socket.id}`
      );

      socket.on("disconnect", () => {
        console.log(
          `❌ Socket Disconnected: ${socket.id}`
        );
      });

      socket.on("error", (error) => {
        console.error(
          "Socket Error:",
          error
        );
      });
    });

    /**
     * Background Schedulers
     */
    startSchedulers();

    /**
     * Start HTTP Server
     */
    server.listen(PORT, () => {
      console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      );
      console.log(
        `🚀 DevSync AI API Running`
      );
      console.log(
        `🌐 http://localhost:${PORT}`
      );
      console.log(
        "📦 MongoDB Connected"
      );
      console.log(
        "⚡ Redis Connected"
      );
      console.log(
        "🔄 BullMQ Workers Started"
      );
      console.log(
        "⏰ Background Schedulers Started"
      );
      console.log(
        "🔌 Socket.IO Ready"
      );
      console.log(
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
      );
    });
  } catch (error) {
    console.error(
      "❌ Server Startup Error:",
      error
    );

    process.exit(1);
  }
};

startServer();
