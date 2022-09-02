import DAO, { SaveUpdateResponse } from "../Dao";
import RolePermission from "App/Models/RolePermission";
import { RequestParams } from "App/Types/Types";

class RolePermissionDAO implements DAO<RolePermission>{

    public async getAll(params: RequestParams): Promise<RolePermission[]> {

        const { page = 1, per_page, is_deleted = false } = params;
        
        const rolePermissions: RolePermission[] = await RolePermission.query()
                .where('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('feature')
                .preload('role')
                .paginate(page, per_page);

        return rolePermissions;
    }

    public async getAllBy(params: RequestParams): Promise<RolePermission[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const rolePermissions: RolePermission[] = await RolePermission.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .preload('feature')
                .preload('role')
                .paginate(page, per_page);

        return rolePermissions;
    }

    public async findAllByFeatureAndRole(featureId: number, roleId: number): Promise<RolePermission[]> {
        
        const rolePermissions: RolePermission[] = await RolePermission.query()
                .where('feature_id', featureId)
                .where('role_id', roleId)
                .orderBy('id', 'desc')
                .preload('feature')
                .preload('role');

        return rolePermissions;
    }

    public async get(uid: string): Promise<RolePermission | null> {
        const rolePermission: RolePermission | null = await RolePermission.findBy('uid', uid);

        if(rolePermission){
            await rolePermission.load('feature');
            await rolePermission.load('role');
        }

        return rolePermission;
    }

    public async search(filters: RequestParams): Promise<RolePermission[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const rolePermission: RolePermission[] = await RolePermission.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('feature')
                .preload('role')
                .paginate(page, per_page);

        return rolePermission;
    }

    public async save(rolePermission: RolePermission): Promise<SaveUpdateResponse<RolePermission>> {

        let response: SaveUpdateResponse<RolePermission> = {status: false};

        await rolePermission.save().then((rolePermission: RolePermission) => {
            response.status = true;
            response.data = rolePermission;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;
    }

    public async update(rolePermission: RolePermission): Promise<SaveUpdateResponse<RolePermission>> {

        let response: SaveUpdateResponse<RolePermission> = {status: false};

        await rolePermission.save().then((rolePermission: RolePermission) => {
            response.status = true;
            response.data = rolePermission;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;

    }

    public async delete(rolePermission: RolePermission): Promise<boolean | any> {

        return rolePermission;

    }
}

export default RolePermissionDAO;