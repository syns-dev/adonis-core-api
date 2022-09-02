import User from "App/Models/User";
import UserDAO from "App/DAO/Users/UserDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class UserService {

    private userDAO = new UserDAO();

    public async getAll(urlParams: RequestParams): Promise<User[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let users: User[];

        if(keyword !== undefined && field !== undefined ){
            users = await this.userDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            users = await this.userDAO.getAllBy(urlParams);
        }else{
            users = await this.userDAO.getAll(urlParams);
        }

        return users;
        
    }

    public async store(data: any): Promise<SaveUpdateResponse<User>> {
        const user: User = new User();

        user.roleId = data.role_id;
        user.name = data.name;
        user.email = data.email;
        user.phone = data.phone;
        user.password = data.password;
    
        let response: SaveUpdateResponse<User> = await this.userDAO.save(user);
    
        return response;
    }

    public find(uid: string): Promise<User | null> {
        return this.userDAO.get(uid);
    }

    public fndBy(field: string, value: any) {
        return this.userDAO.findBy(field, value);
    }

    public async update(uid: string, data: any): Promise<SaveUpdateResponse<User>> {

        const user: User | null = await User.findBy('uid', uid);

        let response: SaveUpdateResponse<User> = {status: false};

        if (user) {

            user.roleId = data.role_id;
            user.name = data.name;
            user.email = data.email;
            user.phone = data.phone;
            user.otpCode = data?.otp_code;

            if(data.password){
                user.password = data.password;
            }

            response = await this.userDAO.update(user);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const user: User | null = await User.findBy('uid', uid);
        let response: boolean = false;

        if(user){
            response = await this.userDAO.delete(user);
        }

        return response;
        
    }


}

export default UserService;