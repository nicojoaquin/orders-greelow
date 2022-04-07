import { Router } from "express";
import {
  registerUser,
  deleteUserById,
  readUsers,
  readUserById,
  updateUserById,
  loginUser,
} from "../controllers/User.controller";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/", readUsers);

router.get("/:id", readUserById);

router.put("/update/:id", updateUserById);

router.delete("/delete/:id", deleteUserById);

export default router;
