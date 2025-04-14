import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validateUpdatedUser } from "../middlewares/validation.middleware.js";
import { authorizePermissions } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/current-user", getCurrentUser);
userRouter.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
userRouter.patch("/update-user", validateUpdatedUser, updateUser);

export default userRouter;
