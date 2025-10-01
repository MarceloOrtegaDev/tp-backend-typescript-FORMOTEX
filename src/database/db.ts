import mongoose from "mongoose";
export const mongoUrl:string = "mongodb://localhost:27017/";
import { conectionDb } from "../interfaces/IDataBase";

export class ConectDb implements conectionDb {
    private static instance: ConectDb
     static  createDb () {
        if(!ConectDb.instance){
           ConectDb.instance = new ConectDb()
        }
        return ConectDb.instance
    }

    async conexion (url: string): Promise<void> {
        try {
            if (!url) {
                throw new Error("La URL de conexión no puede ser undefined");
            }
            await mongoose.connect(url);
            console.log("Base de datos conectada");
        } catch (error) {
            throw new Error("Hubo un problema al conectar la base de datos");
        }
    }
}



