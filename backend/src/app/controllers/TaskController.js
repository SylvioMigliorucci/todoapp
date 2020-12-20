import TaskService from '../services/TaskService';

class TaskController {
    async index(req, res) {
        const { project_id } = req.params;

        const result = await TaskService.ShowTasksByProject.run({project_id})
        res.json(result);
    }

    async store(req, res) {
        const { project_id } = req.params;
        const { description } = req.body;

        const result = await TaskService.CreateTask.run({description, project_id})
        res.json(result);
    }

    async update(req, res) {
        const { project_id, id } = req.params;
        const { description, completed, finished_at } = req.body;

        const result = await TaskService.UpdateTask.run({project_id, id, description, completed, finished_at})
        res.json(result);
    }

    async destroy (req, res) {
      const { project_id, id } = req.params;
        
        const result = await TaskService.DeleteTask.run({ project_id, id });
        res.json(result);
    }
}
export default new TaskController();
