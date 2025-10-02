import { IUser } from "./user.interface"
export interface userQuerys {
    selectOne?(email:string): Promise<IUser | null>
    update?(name:string, email:string, password:string): Promise<IUser | null>
    delete?(_id:string): Promise<string>
    create?(name:string, email:string, password:string, role:string): Promise<IUser>
    selectManyUsers?(): Promise<IUser[]>
    selectUserForId?(_id:string): Promise<IUser | null>
    checkAdmin?(user: IUser): void
}