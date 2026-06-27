import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "mongo-sanitize";
import hpp from "hpp";

import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import webhookRoutes from "./routes/webhook.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(helmet());

app.use(compression());

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use(hpp());

app.use((req, res, next) => {
  if (req.body) {
    mongoSanitize(req.body);
  }

  if (req.params) {
    mongoSanitize(req.params);
  }

  next();
});


app.use(
  "/webhooks",
  webhookRoutes
);

app.use(
  express.json({
    limit: "10mb"
  })
);

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
  message: "Too many requests from this IP"
});

app.use("/api", limiter);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running successfully"
  });
});

app.use("/api/v1", routes);

app.use(errorMiddleware);

export default app;