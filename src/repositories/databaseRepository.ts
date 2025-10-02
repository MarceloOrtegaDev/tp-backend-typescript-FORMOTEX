import { userQuerys } from "../interfaces/IQuerys";
import { userModel } from "../models/userModel";
import { IUser } from "../interfaces/user.interface";

export class dbRepository implements userQuerys {

    async create(name:string, email:string, password:string): Promise<IUser | any> {
        const user = await userModel.create({name, email, password})
        return user
    }

    async delete(_id:string): Promise<string> {
        const deleteUser = await userModel.deleteOne({_id})
        if(!deleteUser){
            return "No se pudo borrar al usuario"
        }
        return "Usuario eliminado exitosamente"
    }

    async selectOne(email:string): Promise<IUser | null> {
        const usuario = await userModel.findOne({email})
        return usuario
    }

    async update(_id: string, name?: string, email?: string, password?: string): Promise<IUser | null> {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    const updatedUser = await userModel.findByIdAndUpdate(_id, updateData, { new: true }); 
    return updatedUser;
}


    async selectManyUsers(): Promise<IUser[] | any> {
        const users = await userModel.find()
        return users
    }

    async selectUserForId(_id:string): Promise<IUser | null>{
        const user = await userModel.findById(_id)
        return user
    }
}