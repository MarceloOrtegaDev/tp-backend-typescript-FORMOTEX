import jwt from 'jsonwebtoken';
import { userId } from '../../interfaces/user.interface';
import { JWT_SECRET } from '../../Env/env';

export const createJwt = (_id:userId):Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const payLoad = { _id };

            jwt.sign(payLoad, JWT_SECRET, {
                expiresIn: '1h'
            }, (err, token) => {
                if (err) {
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            });
        } catch (error) {
            console.log(error);
        }
    });
};