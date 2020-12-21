import Task from '../../models/Task';

class ShowTaskByProject {
    async run({project_id}) {
        return  Task.findAll({
            where: {project_id},
            order: [['completed', 'ASC']]
        });
    }
}

export default new ShowTaskByProject();
