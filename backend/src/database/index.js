import Sequelize from 'sequelize';

import User from '../app/models/User';
import Project from '../app/models/Project';
import Task from '../app/models/Task';

import databaseConfig from '../config/database';

const models = [User, Project, Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
