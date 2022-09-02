import Role from "App/Models/Role";
import RoleDAO from "App/DAO/Roles/RoleDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class RoleService {

    private roleDAO = new RoleDAO();

    public async getAll(urlParams: RequestParams): Promise<Role[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let roles: Role[];

        if(keyword !== undefined && field !== undefined ){
            roles = await this.roleDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            roles = await this.roleDAO.getAllBy(urlParams);
        }else{
            roles = await this.roleDAO.getAll(urlParams);
        }

        return roles;
        
    }

    public async store(data: any): Promise<SaveUpdateResponse<Role>> {
        const role: Role = new Role();

        role.name = data.name;
        role.description = data.description;
    
        let response: SaveUpdateResponse<Role> = await this.roleDAO.save(role);
    
        return response;
    }

    public find(uid: string): Promise<Role | null> {
        return this.roleDAO.get(uid);
    }

    public async update(uid: string, data: any): Promise<SaveUpdateResponse<Role>> {

        const role: Role | null = await Role.findBy('uid', uid);

        let response: SaveUpdateResponse<Role> = {status: false};

        if (role) {

            role.name = data.name;
            role.description = data.description;

            response = await this.roleDAO.update(role);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const role: Role | null = await Role.findBy('uid', uid);
        let response: boolean = false;

        if(role){
            response = await this.roleDAO.delete(role);
        }

        return response;
        
    }


}

export default RoleService;