import UserService from '../services/UserService';

class UserController {
    async index(req, res) {
        // GET
    }

    async store(req, res) {
      const {name, password, email} = req.body;  

      const result = await UserService.CreateUser.run({name, password, email});

      res.json(result);
    }

    async show(req, res) {
        // GET
    }
}
export default new UserController();
