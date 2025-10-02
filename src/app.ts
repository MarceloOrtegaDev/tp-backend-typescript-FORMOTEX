//! Trabajo de Marcelo Ortega
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { ConectDb } from "./database/db"
import { MONGO_DB_CONNECTION } from "./Env/env"
import cookieParser from "cookie-parser"
import { userRoute } from "./routes/userRoutes"
import { inventoryRoute } from "./routes/inventoryRoute"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())
app.use(cookieParser())
app.use("/auth",userRoute)
app.use("/api", inventoryRoute)


app.listen(3000, ()=>{
   ConectDb.createDb().conexion(MONGO_DB_CONNECTION)
    console.log(`Servidor corriendo en htpp://localhost:3000`)
})