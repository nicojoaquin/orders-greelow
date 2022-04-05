import { Router } from "express";
import {
  createUser,
  deleteUserById,
  readUsers,
  readUserById,
  updateUserById,
} from "../controllers/User.controller";

const router = Router();

router.post("/create", createUser);

router.get("/", readUsers);

router.get("/:id", readUserById);

router.put("/update/:id", updateUserById);

router.delete("/delete/:id", deleteUserById);

export default router;
