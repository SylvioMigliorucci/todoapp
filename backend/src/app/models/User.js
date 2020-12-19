import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password_hash) {
        user.password_hash = await bcrypt.hash(user.password_hash, 8);
      }
    });

    return this;
    
  }

  checkPassword(password_hash) {
    return bcrypt.compare(password_hash, this.password_hash);
  }

  
  static associate(models) {
    this.hasMany(models.Project, {
      as: 'user_projects',
      foreignKey: 'user_id',
    });
  }
}

export default User;
