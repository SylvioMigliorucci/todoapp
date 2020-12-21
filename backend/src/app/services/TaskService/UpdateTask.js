import Task from '../../models/Task';


class UpdateTask {
    async run({project_id, id, description, completed, finished_at }) {
        completed ?  finished_at = Date.now() : finished_at = null; 

        return Task.update({ description, completed, finished_at }, { where: { project_id, id } });
    }
}

export default new UpdateTask();
