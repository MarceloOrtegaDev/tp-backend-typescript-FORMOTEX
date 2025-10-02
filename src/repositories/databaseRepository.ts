import { userQuerys } from "../interfaces/IQuerys";
import { userModel } from "../models/userModel";
import { IUser } from "../interfaces/user.interface";
import { IAdminMethods, IEquipo, estadoEquipo, tipoEQuipo } from "../interfaces/IInventary";
import { equipoModel } from "../models/repositoryModel";

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

export class dbInventoryRepository implements IAdminMethods {

    async createEquipe(numeroSerie:string, marca:string, modelo:string, tipo:tipoEQuipo, ubicacion:string, fechaCompra:Date, garantiaHasta:Date): Promise<IEquipo | null> {
        const equipo = await equipoModel.create({numeroSerie, marca, modelo, tipo, ubicacion, fechaCompra, garantiaHasta})
        return equipo
    }

    async deleteEquipe(_id: string): Promise<string | null> {
        const Delete = await equipoModel.deleteOne({_id})
        if(!Delete){
            return "No se pudo borrar el equipo"
        }
        return "Equipo eliminado existosamente"
    }

    async editEquipe( estado:string, ubicacion:string, asignadoA:any): Promise<string | null> {
        const edit = await equipoModel.updateOne({estado, ubicacion, asignadoA})
        if(!edit){
            return "No se pudo editar el equipo"
        }
        return "Equipo editado correctamente"
    }

    async getAllEquipes(): Promise<IEquipo[] | null> {
        const equipes = await equipoModel.find()
        return equipes
    }

    //Para mis usuarios sin rol de admin

    async getEquipoById(_id:IEquipo["_id"]): Promise<IEquipo | null> {
        const equipo = equipoModel.findById({_id})
        return equipo
    }
}