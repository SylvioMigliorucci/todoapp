import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        project_id: Sequelize.INTEGER,
        completed: Sequelize.BOOLEAN,
        finished_at: Sequelize.DATE
      },
      {
        sequelize,
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Project, {
      as: 'project',
      foreignKey: 'project_id',
    });
  }
}

export default Task;
