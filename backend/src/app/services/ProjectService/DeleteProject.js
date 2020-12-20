import Project from '../../models/Project';

class DeleteProject {
    async run({ id, user_id }) {
        return Project.destroy({where: {id, user_id}});
    }
}

export default new DeleteProject();
