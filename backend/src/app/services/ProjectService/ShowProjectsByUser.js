import Project from '../../models/Project';

class ShowProjectsByUser {
    async run({ user_id }) {
        return Project.findAll({
            where: {user_id}
        });
    }
}

export default new ShowProjectsByUser();
