export interface conectionDb{
    conexion(url:string):Promise<void>
}