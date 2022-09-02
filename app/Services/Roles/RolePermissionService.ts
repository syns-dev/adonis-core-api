import RolePermission from "App/Models/RolePermission";
import RolePermissionDAO from "App/DAO/Roles/RolePermissionDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class RolePermissionService {

    private rolePermissionDAO = new RolePermissionDAO();

    public async getAll(urlParams: RequestParams): Promise<RolePermission[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let rolePermissions: RolePermission[];

        if(keyword !== undefined && field !== undefined ){
            rolePermissions = await this.rolePermissionDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            rolePermissions = await this.rolePermissionDAO.getAllBy(urlParams);
        }else{
            rolePermissions = await this.rolePermissionDAO.getAll(urlParams);
        }

        return rolePermissions;
        
    }

    public async findAllByFeatureAndRole(featureId: number, roleId: number): Promise<RolePermission[]> {
        const rolePermissions = await this.rolePermissionDAO.findAllByFeatureAndRole(featureId, roleId);
        return rolePermissions;
    }

    public async store(data: any): Promise<SaveUpdateResponse<RolePermission>> {
        const rolePermission: RolePermission = new RolePermission();

        rolePermission.roleId = data.role_id;
        rolePermission.featureId = data.feature_id;
        rolePermission.canCreate = data.can_create;
        rolePermission.canRead = data.can_read;
        rolePermission.canUpdate = data.can_update;
        rolePermission.canDelete = data.can_delete;
    
        let response: SaveUpdateResponse<RolePermission> = await this.rolePermissionDAO.save(rolePermission);
    
        return response;
    }

    public find(uid: string): Promise<RolePermission | null> {
        return this.rolePermissionDAO.get(uid);
    }

    public async update(uid: string, data: any): Promise<SaveUpdateResponse<RolePermission>> {

        const rolePermission: RolePermission | null = await RolePermission.findBy('uid', uid);

        let response: SaveUpdateResponse<RolePermission> = {status: false};

        if (rolePermission) {

            rolePermission.roleId = data.role_id;
            rolePermission.featureId = data.feature_id;
            rolePermission.canCreate = data.can_create;
            rolePermission.canRead = data.can_read;
            rolePermission.canUpdate = data.can_update;
            rolePermission.canDelete = data.can_delete;

            response = await this.rolePermissionDAO.update(rolePermission);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const rolePermission: RolePermission | null = await RolePermission.findBy('uid', uid);
        let response: boolean = false;

        if(rolePermission){
            response = await this.rolePermissionDAO.delete(rolePermission);
        }

        return response;
        
    }


}

export default RolePermissionService;