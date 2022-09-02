import DAO, { SaveUpdateResponse } from "../Dao";
import Role from "App/Models/Role";
import { RequestParams } from "App/Types/Types";

class RoleDAO implements DAO<Role>{

    public async getAll(params: RequestParams): Promise<Role[]> {

        const { page = 1, per_page, is_deleted = false } = params;
        
        const roles: Role[] = await Role.query()
                .where('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('users')
                .preload('permissions')
                .paginate(page, per_page);

        return roles;
    }

    public async getAllBy(params: RequestParams): Promise<Role[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const roles: Role[] = await Role.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .preload('users')
                .preload('permissions')
                .paginate(page, per_page);

        return roles;
    }

    public async get(uid: string): Promise<Role | null> {
        const role: Role | null = await Role.findBy('uid', uid);

        if(role){
            await role.load('users');
            await role.load('permissions');
        }

        return role;
    }

    public async search(filters: RequestParams): Promise<Role[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const role: Role[] = await Role.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('users')
                .preload('permissions')
                .paginate(page, per_page);

        return role;
    }

    public async save(role: Role): Promise<SaveUpdateResponse<Role>> {

        let response: SaveUpdateResponse<Role> = {status: false};

        await role.save().then((role: Role) => {
            response.status = true;
            response.data = role;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;
    }

    public async update(role: Role): Promise<SaveUpdateResponse<Role>> {

        let response: SaveUpdateResponse<Role> = {status: false};

        await role.save().then((role: Role) => {
            response.status = true;
            response.data = role;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;

    }

    public async delete(role: Role): Promise<boolean | any> {

        role.isDeleted = true;

        let status: boolean | any = false;

        await role.save().then((role: Role) => {
            status = role.isDeleted;
        }).then((error: any) => {
            status = error;
        });

        return status;

    }
}

export default RoleDAO;