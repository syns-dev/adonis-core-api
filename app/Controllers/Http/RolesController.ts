/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RoleValidator from 'App/Validators/RoleValidator';
import RoleService from 'App/Services/Roles/RoleService';
import Role from 'App/Models/Role';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { RequestParams, RoleFormData } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class RolesController {
    
  private roleService = new RoleService();

  public async index({request}: HttpContextContract): Promise<Role[]> {

    const urlParams: RequestParams = await request.validate(RequestValidator);

    const roles: Role[] = await this.roleService.getAll(urlParams);
    
    return roles;
  
  }

  public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<Role>> {

    try {

      const data: RoleFormData = await request.validate(RoleValidator);
      const response: SaveUpdateResponse<Role> = await this.roleService.store(data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async show({ params }: HttpContextContract): Promise<Role | null> {

    const response = await this.roleService.find(params.id);

    return response;

  }

  public async update({ params, request }: HttpContextContract): Promise<SaveUpdateResponse<Role>> {

    try {

      const data: RoleFormData = await request.validate(RoleValidator);
      const response: SaveUpdateResponse<Role> = await this.roleService.update(params.id, data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async destroy({ params }: HttpContextContract): Promise<SaveUpdateResponse<Role> | any> {

    try {

      await this.roleService.destroy(params.id);

      return {status: true};
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

}
