import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import ServiceError from '../../utils/ServiceError';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Você precisa enviar o token' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.user_id = decoded.user_id;
    req.name = decoded.name;
    req.email = decoded.email;

    return next();
  } catch (error) {
    // return res.status(401).json({ error: 'Token invalido' });
    throw new ServiceError(401, 'Token Inválido');
  }
};
