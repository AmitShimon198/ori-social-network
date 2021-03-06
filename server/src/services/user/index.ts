import { UserModel } from "../../model";

export class UserService {
    private static instance: UserService;
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService()
        }
        return UserService.instance;
    }
    
    async findOneIfExists(email: string) {
        return await UserModel.findOne({
            email,
        })
    }
    
    async createUser(name: string, email: string, password: string, avatar: string) {
        return await UserModel.create({
            name,
            email,
            password,
            avatar: avatar || ''
        })
    }
}

export default UserService.getInstance();