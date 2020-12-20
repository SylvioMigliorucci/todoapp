import Task from '../../models/Task';

class ShowTaskByProject {
    async run({project_id}) {
        
        return Task.findAll({
            where: {project_id}
        });
    }
}

export default new ShowTaskByProject();
