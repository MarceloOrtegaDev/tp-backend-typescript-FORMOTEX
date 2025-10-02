import { Router } from "express";
import { validarJwt } from "../jwt/validarJwt/validateJwt";
import { createEquipe, deleteEquipe, editEquipe, getEquipoById, getAllEquipes} from "../controllers/inventaryController";

export const inventoryRoute = Router();

/*Solo de mis administradores*/
inventoryRoute.post("/createEquipe", validarJwt, createEquipe);
inventoryRoute.delete("/deleteEquipe/:_id", validarJwt, deleteEquipe);
inventoryRoute.put("/updateEquipe/:_id", validarJwt, editEquipe);
/* Esto lo pueden usar los 2, tanto el admin como los usuarios que tengo como user pero en getAllEquipos el usuario 
solo obtiene los suyos o los disponibles*/ 
inventoryRoute.get("/getEquipeForId/:_id", validarJwt, getEquipoById);
inventoryRoute.get("/getAllEquipes", validarJwt, getAllEquipes);

