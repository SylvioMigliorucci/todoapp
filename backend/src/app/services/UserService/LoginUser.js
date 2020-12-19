import User from '../../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import ServiceError from '../../../utils/ServiceError';
class LoginUser {
    async run({ email, password }) {
        
        const user = await User.findOne({where : {email}});
  
        if (!user)
          throw new ServiceError(401, 'Alguma das informações de credenciais estão incorretas');
        
        if (!(await user.checkPassword(password)))
          throw new ServiceError(401, 'Alguma das informações de credenciais estão incorretas');

        return {token: jwt.sign({
          user_id: user.id,
          name: user.name,
          email: user.email,
        }, authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        })}
    }
}

export default new LoginUser();
