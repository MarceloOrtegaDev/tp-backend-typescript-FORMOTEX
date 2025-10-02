import { Response, Request } from "express";
import { userService } from "../services/user.services";
import { IUser } from "../interfaces/user.interface";

export const ServiceForUsers = new userService()

export const loginUser = async (req:Request, res:Response): Promise<void> => {
    const {email, password} = req.body
    try {
        const {user, token} = await ServiceForUsers.loginService(email, password)

         res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ msg: "Login exitoso", user: { email: user.email } });
    } catch (error) {
        res.status(404).json("No se pudo iniciar sesion.")
    }
}

export const registerUser = async (req:Request, res:Response) => {
    const {name, email, password} = req.body
    try {
        const usuario = await ServiceForUsers.selectOne(email)
        if(usuario){
            res.status(400).json("Ese usuario ya existe bro")
        }

        const newUser = await ServiceForUsers.create(name, email, password)
        if(!newUser){
            res.status(404).json("No se pudo crear el usuario")
        }
        res.status(200).json("Usuario creado correctamente")
    } catch (error) {
        res.status(404).json("No se pudo crear la cuenta")
    }
}

export const getAllUsers = async (req:Request, res:Response):Promise<IUser[] | any> => {
    try {
        ServiceForUsers.checkAdmin(req.user)
        const users = await ServiceForUsers.selectManyUsers()
        if(!users){
        return res.status(200).json("No se encontraron usuarios")
        }

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
}

export const getUserForId = async(req: Request, res: Response): Promise<void> => {
    try {
        ServiceForUsers.checkAdmin(req.user)
        const { _id } = req.params;
        const user = await ServiceForUsers.selectUserForId(_id);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(404).json({ msg: error.message || "Usuario no encontrado" });
    }
};

export const deleteUser = async (req:Request, res:Response) => {
    try {
        ServiceForUsers.checkAdmin(req.user)
        const {_id} = req.params
        const user = await ServiceForUsers.selectUserForId(_id)
        if(!user){
            res.status(400).json("No existe este usuario")
        }
        res.status(201).json("Usuario eliminado exitosamente")
        return await ServiceForUsers.delete(_id)
    } catch (error) {
        return res.status(404).json("No se pudo borrar el usuario")
    }
}

export const updateUser = async (req: Request, res: Response) => {
    if (req.user.Role !== "admin") {
        res.status(403).json("No tienes acceso a esta función");
    }

    const { _id } = req.params;
    const { name, email, password } = req.body;

    try {
        const updatedUser = await ServiceForUsers.update(_id, name, email, password);
        res.status(200).json({ msg: "Usuario editado correctamente", user: updatedUser });
    } catch (error: any) {
        res.status(500).json({ msg: error.message || "Hubo un error al editar el usuario" });
    }
};


