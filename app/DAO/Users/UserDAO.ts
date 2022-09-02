import DAO, { SaveUpdateResponse } from "../Dao";
import User from "App/Models/User";
import { RequestParams } from "App/Types/Types";

class UserDAO implements DAO<User>{

    public async getAll(params: RequestParams): Promise<User[]> {

        const { page = 1, per_page, is_deleted = false } = params;
        
        const users: User[] = await User.query()
                .where('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('role')
                .paginate(page, per_page);

        return users;
    }

    public async getAllBy(params: RequestParams): Promise<User[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const users: User[] = await User.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .preload('role')
                .paginate(page, per_page);

        return users;
    }

    public async get(uid: string): Promise<User | null> {
        const user: User | null = await User.findBy('uid', uid);

        if(user){
            await user.load('role');
        }

        return user;
    }

    public async findBy(field: string, value: any): Promise<User | null> {
        const user: User | null = await User.findBy(field, value);

        if(user){
            user.load('role');
        }

        return user;
    }

    public async search(filters: RequestParams): Promise<User[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const users: User[] = await User.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('role')
                .paginate(page, per_page);

        return users;
    }

    public async save(user: User): Promise<SaveUpdateResponse<User>> {

        let response: SaveUpdateResponse<User> = {status: false};

        await user.save().then((user: User) => {
            response.status = true;
            response.data = user;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;
    }

    public async update(user: User): Promise<SaveUpdateResponse<User>> {

        let response: SaveUpdateResponse<User> = {status: false};

        await user.save().then((user: User) => {
            response.status = true;
            response.data = user;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;

    }

    public async delete(user: User): Promise<boolean | any> {

        user.isDeleted = true;

        let status: boolean | any = false;

        await user.save().then((user: User) => {
            status = user.isDeleted;
        }).then((error: any) => {
            status = error;
        });

        return status;

    }
}

export default UserDAO;