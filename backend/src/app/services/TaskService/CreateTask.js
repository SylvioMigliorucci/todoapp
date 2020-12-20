import Task from '../../models/Task';

class CreateTask {
    async run({ description, project_id }) {
        return Task.create({ description, project_id });
    }
}

export default new CreateTask();
