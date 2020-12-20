import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
  
  static associate(models) {
    this.hasMany(models.Task, {
      as: 'project_tasks',
      foreignKey: 'project_id',
    });

    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  }
}

export default Project;
