import { Router } from "express";
import { registerUser, getAllUsers, loginUser, getUserForId, deleteUser, updateUser } from "../controllers/userControllers";
import { validarJwt } from "../jwt/validarJwt/validateJwt";
export const userRoute = Router();

userRoute.post("/login", loginUser)
userRoute.post("/register", registerUser)
userRoute.get("/getAllUsers",validarJwt, getAllUsers)
userRoute.get("/getUserForId/:_id", validarJwt, getUserForId)
userRoute.delete("/deleteUser/:_id", validarJwt, deleteUser)
userRoute.patch("/editarUsuario/:_id", validarJwt, updateUser)

