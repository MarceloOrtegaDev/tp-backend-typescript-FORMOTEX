import { userQuerys } from "../interfaces/IQuerys";
import { userModel } from "../models/userModel";
import { IUser } from "../interfaces/user.interface";

export class dbRepository implements userQuerys {

    async create(name:string, email:string, password:string, role:string): Promise<IUser | any> {
        const user = await userModel.create(name, email, password, role)
        return user
    }

    async delete(): Promise<void> {
        const deleteUser = await userModel.deleteOne()
    }

    async select(email:string): Promise<IUser | any> {
        const select = await userModel.findOne({email})
    }

    async update(): Promise<void> {
        const update = await userModel.updateOne({})
    }

}