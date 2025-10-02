
export interface userId {
    _id: string
}

export interface IUser extends userId{
    name: string
    email: string
    password: string
    Role?:string
}

