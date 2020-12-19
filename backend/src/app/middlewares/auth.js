import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import SessionService from '../services/SessionService';
import authConfig from '../../config/auth';
import ServiceError from '../../util/ServiceError';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Você precisa enviar o token' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.user_id = decoded.id;
    req.document = decoded.document;
    req.session_id = decoded.session_id;
    req.platform = decoded.platform;
    req.is_admin = decoded.is_admin;

    // verifica token com sessao.permitido false ou true
    if (
      !(await SessionService.SessionAllowed.run({
        sessionId: req.session_id,
      }))
    ) {
      throw new ServiceError(403, 'Token Inválido');
    }

    return next();
  } catch (error) {
    // return res.status(401).json({ error: 'Token invalido' });
    throw new ServiceError(401, 'Token Inválido');
  }
};
