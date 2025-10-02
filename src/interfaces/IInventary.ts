import { Types } from "mongoose"

export interface IEquipo {
    _id?:string
    numeroSerie:string
    marca:string
    modelo:string
    tipo:tipoEQuipo
    estado?: estadoEquipo
    ubicacion?:string
    fechaCompra:Date
    garantiaHasta:Date
    asignadoA?: Types.ObjectId | null
    fechaAsignacion: Date
}

export type tipoEQuipo = "laptop" | "desktop" | "servidor" | "monitor" | "impresora" | "otro"
export type estadoEquipo = "disponible" | "asignado" | "mantenimiento" | "baja"


export interface IAdminMethods {
    getEquipoById?(_id:string):Promise<IEquipo | null>
    createEquipe(numeroSerie:string, marca:string, modelo:string, tipo:tipoEQuipo, ubicacion:string, fechaCompra:Date, garantiaHasta:Date): Promise<IEquipo | null>
    editEquipe(estado:estadoEquipo, ubicacion:string, asignadoA:any):Promise<string | null>
    deleteEquipe(_id:string):Promise<string | null>
    getAllEquipes():Promise<IEquipo[] | null>
}
