import Project from '../../models/Project';

class UpdateProject {
    async run({ id, name }) {
        return Project.update({ name }, { where: { id } });
    }
}

export default new UpdateProject();
