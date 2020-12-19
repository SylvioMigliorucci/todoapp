import ServiceError from '../../util/ServiceError';

export default async (req, res, next) => {
  const { is_admin } = req;
  if (is_admin) {
    return next();
  }
  throw new ServiceError(
    401,
    'Você não está autorizado para acessar essa rota'
  );
};
