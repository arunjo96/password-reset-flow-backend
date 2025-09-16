
import { Router } from "express";
import {register, login, forgotPassword, resetPassword } from "../controllers/authController.js";

const authrouter = Router();


authrouter.post("/register", register);

authrouter.post("/login", login);

authrouter.post("/forgotPassword", forgotPassword);

authrouter.post("/resetPassword/:token", resetPassword);

export default authrouter;