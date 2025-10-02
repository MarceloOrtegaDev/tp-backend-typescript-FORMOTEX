import { userQuerys } from "../interfaces/IQuerys";
import { IUser } from "../interfaces/user.interface";
import { dbRepository } from "../repositories/databaseRepository";
import { hash, genSalt } from "bcrypt"
import { createJwt } from "../jwt/crearJwt/createJwt";
import { compare } from "bcrypt";


export class userService implements userQuerys {
    private userQueries!: dbRepository

    constructor() {
        this.userQueries = new dbRepository()
    }

    async create(name: string, email: string, password: string): Promise<IUser | any> {
        const salt = await genSalt(16)
        const newPassword = await hash(password, salt)
        return await this.userQueries.create(name, email, newPassword)
    }

    async delete(_id: string): Promise<string | any> {
        await this.userQueries.delete(_id)
    }

    async selectOne(email: string): Promise<IUser | null> {
        return await this.userQueries.selectOne(email)
    }

    async loginService(email:string, password:string): Promise<{user:IUser; token:string}> {
        const user = await this.userQueries.selectOne(email)
        if (!user) {
            throw new Error("Ese usuario no existe")
        }

        const validPassword = await compare(password, user.password)
        if (!validPassword) {
            throw new Error("La contraseña es incorrecta, intentelo de nuevo.")
        }

        const token = await createJwt({_id: user._id});

        return {user, token}
    }

    async update(_id: string, name?: string, email?: string, password?: string): Promise<IUser | null> {
    let newPassword: string | undefined = undefined;
    if (password !== undefined) {
        const salt = await genSalt(16);
        newPassword = await hash(password, salt);
    }

    const updatedUser = await this.userQueries.update(_id, name, email, newPassword);
    if (!updatedUser) {
        throw new Error("No se pudo editar el usuario");
    }
    return updatedUser
}


    async selectManyUsers(): Promise<IUser[]> {
        return await this.userQueries.selectManyUsers()
    }

    async selectUserForId(_id:string): Promise<IUser | null>{
        const user = await this.userQueries.selectUserForId(_id)
        if(!user){
            throw new Error("El usuario no fue encontrado")
        }
        return user
    }

    checkAdmin(user: IUser) {
        if (user.Role !== "admin") {
            throw new Error("No tienes permisos para esta acción");
        }
    }
}
