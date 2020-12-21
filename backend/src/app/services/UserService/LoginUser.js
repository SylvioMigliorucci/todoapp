import User from '../../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import ServiceError from '../../../utils/ServiceError';
class LoginUser {
    async run({ email, password }) {
        
        const user = await User.findOne({where : {email}});
  
        if (!(await user.checkPassword(password)) || !user)
          throw new ServiceError(401, 'Your email or password is incorrect');

        return {
          name: user.name,
          token: jwt.sign({
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
