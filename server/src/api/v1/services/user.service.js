const UserRepository = require("../../../../../../point-of-sale/apps/api/src/repositories/UserRepository");


class UserService {

    static async getAllUsers() {
        // Logic to get all users
        return UserRepository.findAll({page, limit});
    }

}