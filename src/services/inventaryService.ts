import { IEquipo, estadoEquipo, tipoEQuipo } from "../interfaces/IInventary";
import { dbInventoryRepository } from "../repositories/databaseRepository";

export class inventoryService {
    private service: dbInventoryRepository;

    constructor() {
        this.service = new dbInventoryRepository();
    }

    async createEquipe(numeroSerie: string, marca: string, modelo: string, tipo: tipoEQuipo, ubicacion: string, fechaCompra: Date, garantiaHasta: Date, user: any): Promise<IEquipo | string> {
        if (user.Role !== "admin") return "No tienes permisos para crear equipos";
        if (!numeroSerie || !marca || !modelo || !tipo || !ubicacion || !fechaCompra || !garantiaHasta) 
            throw new Error("Falta información obligatoria");

        const equipo = await this.service.createEquipe(numeroSerie, marca, modelo, tipo, ubicacion, fechaCompra, garantiaHasta);
        if (!equipo) return "No se pudo crear el nuevo equipo";
        return equipo;
    }

    async editEquipe(_id: string, estado: estadoEquipo, ubicacion: string, asignadoA: any, user: any): Promise<string> {
        if (user.Role !== "admin") return "No tienes permisos para editar equipos";
        const existinEquipe = await this.service.getEquipoById(_id);
        if (!existinEquipe) return "Equipo no encontrado";

        const update = await this.service.editEquipe(estado, ubicacion, asignadoA);
        return update ? "Equipo editado correctamente" : "No se pudo editar el equipo";
    }

    async deleteEquipe(_id: string, user: any): Promise<string> {
        if (user.Role !== "admin") return "No tienes permisos para eliminar equipos";
        const existinEquipe = await this.service.getEquipoById(_id);
        if (!existinEquipe) return "Equipo no encontrado";

        const deleteOne = await this.service.deleteEquipe(_id);
        return deleteOne ? "Equipo eliminado correctamente" : "No se pudo borrar el equipo";
    }

    async getEquipoById(_id: string, user: any): Promise<IEquipo | string> {
        const equipo = await this.service.getEquipoById(_id);
        if (!equipo) return "Equipo no encontrado";
        if (user.Role !== "admin" && equipo.estado !== "disponible" && equipo.asignadoA?.toString() !== user._id) 
            return "No tienes acceso a este equipo";
        return equipo;
    }

    async getAllEquipes(user: any, filtros?: { estado?: estadoEquipo; tipo?: tipoEQuipo }): Promise<IEquipo[]> {
        let equipes = await this.service.getAllEquipes();
        if (!equipes) return [];

        if (user.Role !== "admin") {
            equipes = equipes.filter(e => e.estado === "disponible" || e.asignadoA?.toString() === user._id);
        }

        if (filtros?.estado) equipes = equipes.filter(e => e.estado === filtros.estado);
        if (filtros?.tipo) equipes = equipes.filter(e => e.tipo === filtros.tipo);

        return equipes;
    }
}
