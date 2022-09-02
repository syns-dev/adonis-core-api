import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RolePermissionService from 'App/Services/Roles/RolePermissionService';
import RolePermission from 'App/Models/RolePermission';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { PermissionFormData, RequestParams } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class RolePermissionsController {
  
    private rolePermissionService = new RolePermissionService();

    public async index({request}: HttpContextContract): Promise<RolePermission[]> {
  
      const urlParams: RequestParams = await request.validate(RequestValidator);
  
      const roles: RolePermission[] = await this.rolePermissionService.getAll(urlParams);
      
      return roles;
    
    }
  
    public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<RolePermission>> {
  
      try {
  
        const data: PermissionFormData[] = Object.keys(request.all()).map((key: string) => request.all()[key] );
        let response: SaveUpdateResponse<RolePermission> = {status: false};

        for (let index = 0; index < data.length; index++) {

          const permission: PermissionFormData = data[index];

          const roleFeaturePermissions: RolePermission[] = await this.rolePermissionService.findAllByFeatureAndRole(permission.feature_id, permission.role_id);

          if(roleFeaturePermissions.length == 0){

            response = await this.rolePermissionService.store(permission);

          }else{

            const roleFeaturePermission = roleFeaturePermissions[0];
            
            response = await this.rolePermissionService.update(roleFeaturePermission.uid, permission);

          }
          
        }
  
        return response;
        
      } catch (error) {
        return {status: false, errors: error.messages.errors};
      }
  
    }
  
    public async show({ params }: HttpContextContract): Promise<RolePermission | null> {
  
      const response: RolePermission | null = await this.rolePermissionService.find(params.id);
  
      return response;
  
    }

    public async destroy({ params }: HttpContextContract): Promise<SaveUpdateResponse<RolePermission> | any> {
  
      try {
  
        await this.rolePermissionService.destroy(params.id);
  
        return {status: true};
        
      } catch (error) {
        return {status: false, errors: error.messages.errors};
      }
  
    }
  

}
