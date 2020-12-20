import ProjectService from '../services/ProjectService';

class ProjectController {
    async index(req, res) {
        const {user_id} = req;

        const result = await ProjectService.ShowProjectsByUser.run({user_id});
        res.json(result);
    }

    async store(req, res) {
        const { user_id } = req;
        const {name } = req.body;

        const result = await ProjectService.CreateProject.run({name, user_id})
        res.json(result);
    }

    async update(req, res) {
        const {id} = req.params;
        const {name } = req.body;

        const result = await ProjectService.UpdateProject.run({id, name})
        res.json(result);
    }

    async destroy (req, res) {
        const { user_id } = req;
        const { id } = req.params;
        
        const result = await ProjectService.DeleteProject.run({id, user_id});
        res.json(result);
    }
}
export default new ProjectController();
