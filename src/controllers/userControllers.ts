import { dbRepository } from "../repositories/databaseRepository";
import { Response, Request } from "express";
const hola = new dbRepository()

export const createUser = async (req:Request, res:Response) => {
    const {name, email, password, role = "user"} = req.body
    try {
        
        const usuario = await hola.select(email)
        if(usuario){
            res.status(400).json("Ese usuario ya existe bro")
        }

        const newUser = await hola.create(name, email, password, role)
        res.status(200).json("Usuario creado correctamente")
    } catch (error) {
        console.log(error);
    }
}