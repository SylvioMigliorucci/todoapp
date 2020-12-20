import Task from '../../models/Task';

class CreateTask {
    async run({ id, project_id }) {
        return Task.destroy({where: {id, project_id}});
    }
}

export default new CreateTask();
