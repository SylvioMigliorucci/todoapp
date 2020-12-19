import User from '../../models/User';

class CreateUser {
    async run({ name, password, email }) {
        return User.create({ name, password_hash: password, email });
    }
}

export default new CreateUser();
