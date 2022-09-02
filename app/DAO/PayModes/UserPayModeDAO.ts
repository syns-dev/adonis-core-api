import DAO, { SaveUpdateResponse } from "../Dao";
import UserPayMode from "App/Models/UserPayMode";
import { RequestParams } from "App/Types/Types";

class UserPayModeDAO implements DAO<UserPayMode>{

    public async getAll(params: RequestParams): Promise<UserPayMode[]> {

        const { page = 1, per_page, is_deleted = false } = params;
        
        const userPayModes: UserPayMode[] = await UserPayMode.query()
                .where('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('pay_mode')
                .preload('user')
                .paginate(page, per_page);

        return userPayModes;
    }

    public async getAllBy(params: RequestParams): Promise<UserPayMode[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const userPayModes: UserPayMode[] = await UserPayMode.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .preload('pay_mode')
                .preload('user')
                .paginate(page, per_page);

        return userPayModes;
    }

    public async get(uid: string): Promise<UserPayMode | null> {
        const userPayMode: UserPayMode | null = await UserPayMode.findBy('uid', uid);

        if(userPayMode){
            await userPayMode.load('pay_mode');
            await userPayMode.load('user');
        }

        return userPayMode;
    }

    public async findBy(field: string, value: any): Promise<UserPayMode | null> {
        const userPayMode: UserPayMode | null = await UserPayMode.findBy(field, value);

        if(userPayMode){
            await userPayMode.load('pay_mode');
            await userPayMode.load('user');
        }

        return userPayMode;
    }

    public async search(filters: RequestParams): Promise<UserPayMode[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const userPayMode: UserPayMode[] = await UserPayMode.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('pay_mode')
                .preload('user')
                .paginate(page, per_page);

        return userPayMode;
    }

    public async save(userPayMode: UserPayMode): Promise<SaveUpdateResponse<UserPayMode>> {

        let response: SaveUpdateResponse<UserPayMode> = {status: false};

        await userPayMode.save().then(async (userPayMode: UserPayMode) => {

            await userPayMode.load('pay_mode');
            await userPayMode.load('user');

            response.status = true;
            response.data = userPayMode;

        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;
    }

    public async update(userPayMode: UserPayMode): Promise<SaveUpdateResponse<UserPayMode>> {

        let response: SaveUpdateResponse<UserPayMode> = {status: false};

        await userPayMode.save().then(async (userPayMode: UserPayMode) => {

            await userPayMode.load('pay_mode');
            await userPayMode.load('user');

            response.status = true;
            response.data = userPayMode;

        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;

    }

    public async delete(userPayMode: UserPayMode): Promise<boolean | any> {

        userPayMode.isDeleted = true;

        let status: boolean | any = false;

        await userPayMode.save().then((userPayMode: UserPayMode) => {
            status = userPayMode.isDeleted;
        }).then((error: any) => {
            status = error;
        });

        return status;

    }
}

export default UserPayModeDAO;