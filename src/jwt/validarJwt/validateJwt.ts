import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { userModel } from '../../models/userModel';
import { JWT_SECRET } from '../../Env/env';

export const validarJwt = async (req: Request, res:Response, next:NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json('No se encontró el token');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            res.status(401).json('Token invalido');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};