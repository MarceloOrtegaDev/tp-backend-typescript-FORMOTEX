import { Request, Response } from "express";
import { ServiceForUsers } from "./userControllers";
import { inventoryService } from "../services/inventaryService";

const servicio = new inventoryService();

export const createEquipe = async (req: Request, res: Response) => {
    ServiceForUsers.checkAdmin(req.user);
    const { numeroSerie, marca, modelo, tipo, estado, ubicacion, fechaCompra, garantiaHasta } = req.body;

    try {
        const newEquipe = await servicio.createEquipe(numeroSerie, marca, modelo, tipo, ubicacion, fechaCompra, garantiaHasta, req.user);
        if(!newEquipe){
            res.status(400).json("No se pudo crear el equipo")
        }
        res.status(200).json(newEquipe);
    } catch (error) {
        console.log(error);
        res.status(400).json("Hubo un error inesperado");
    }
};

export const deleteEquipe = async (req: Request, res: Response) => {
    ServiceForUsers.checkAdmin(req.user);
    const { _id } = req.params;

    try {
        const result = await servicio.deleteEquipe(_id, req.user);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json("Hubo un error inesperado");
    }
};

export const editEquipe = async (req: Request, res: Response) => {
    ServiceForUsers.checkAdmin(req.user);
    const { _id } = req.params;
    const { estado, ubicacion, asignadoA } = req.body;

    try {
        const result = await servicio.editEquipe(_id, estado, ubicacion, asignadoA, req.user);
        res.status(201).json({ msg: result });
    } catch (error) {
        res.status(404).json("Hubo un error inesperado");
    }
};

export const getEquipoById = async (req: Request, res: Response) => {
    const { _id } = req.params;

    try {
        const equipoFound = await servicio.getEquipoById(_id, req.user);
        res.status(200).json(equipoFound);
    } catch (error) {
        res.status(404).json("Hubo un error inesperado");
    }
};

export const getAllEquipes = async (req: Request, res: Response) => {
    try {
        const getEquipes = await servicio.getAllEquipes(req.user, req.query);
        res.status(200).json(getEquipes);
    } catch (error) {
        res.status(404).json("Hubo un error inesperado");
    }
};
