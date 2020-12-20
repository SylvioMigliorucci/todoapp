import Project from '../../models/Project';

class CreateProject {
    async run({ id, user_id }) {
        return Project.destroy({where: {id, user_id}});
    }
}

export default new CreateProject();
