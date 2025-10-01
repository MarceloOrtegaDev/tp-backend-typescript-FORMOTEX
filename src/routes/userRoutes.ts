import { Router } from "express";
import { createUser } from "../controllers/userControllers";
export const userRoute = Router();

userRoute.post("/api/register", createUser)
// userRoute.post("/api/login",loginUser)
// userRoute.get("/api/auth",validarJwt, authUser)
// userRoute.get("/api/logout", logoutUser)

