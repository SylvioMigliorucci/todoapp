import Project from '../../models/Project';

class CreateProject {
    async run({ name, user_id }) {
        return Project.create({ name, user_id });
    }
}

export default new CreateProject();
