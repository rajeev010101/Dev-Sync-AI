import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import uploadRoutes from "../modules/uploads/upload.routes.js";

import userRoutes from "../modules/users/user.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";
import aiRoutes from "../modules/ai/ai.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js";
import notificationRoutes from "../modules/notifications/notification.routes.js";


const router = Router();




router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/ai", aiRoutes);
router.use(
  "/payments",
  paymentRoutes
);

router.use(
  "/uploads",
  uploadRoutes
);

router.use(
  "/notifications",
  notificationRoutes
);




router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevSync AI API v1"
  });
});

export default router;