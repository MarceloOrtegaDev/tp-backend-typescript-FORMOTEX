import { IUser } from "./user.interface"
export interface userQuerys {
    select?(email:string): Promise<IUser>
    update?(): Promise<void>
    delete?(): Promise<void>
    create?(name:string, email:string, password:string, role:string): Promise<IUser>
}