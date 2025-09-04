import userRepository, { UserCreate } from "../repository/user_repository";


class UserServices {

    async createUser(userData:UserCreate){
        return await userRepository.createUser(userData);
    }

    async findByEmail(email: string){
        return await userRepository.findByEmail(email);
    }

    async updateUser(id:number,userData:UserCreate){
        return await userRepository.updateUser(id,userData);
    }

    async deleteUser(id:number){
        return await userRepository.deleteUser(id);
    }
}
export default new UserServices()