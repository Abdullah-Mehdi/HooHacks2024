import express from "express";
import { createUser, getUser } from "../controller/user.controller.js";
import { loginUser, signupUser } from "../controller/user.controller.js";

const router = express.Router();

// router.post("/", createUser);
// router.get("/", getUser);


//Login route
router.post("/login", loginUser);

//Signup route
router.post("/signup", signupUser);

export default router;

