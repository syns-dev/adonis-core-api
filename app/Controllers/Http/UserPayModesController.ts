import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';
import UserPayModeValidator from 'App/Validators/UserPayModeValidator';
import UserPayModeService from 'App/Services/PayModes/UserPayModeService';
import UserPayMode from 'App/Models/UserPayMode';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { RequestParams, UserPayModeFormData } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class UserPayModesController {
  
  private userPayModeService = new UserPayModeService();

  public async index({request}: HttpContextContract): Promise<UserPayMode[]> {

    const urlParams: RequestParams = await request.validate(RequestValidator);

    const userPayModes: UserPayMode[] = await this.userPayModeService.getAll(urlParams);
    
    return userPayModes;
  
  }

  public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<UserPayMode>> {

    try {

      const data: UserPayModeFormData = await request.validate(UserPayModeValidator);
      const response: SaveUpdateResponse<UserPayMode> = await this.userPayModeService.store(data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async show({ params }: HttpContextContract): Promise<UserPayMode | null> {

    const response: UserPayMode | null = await this.userPayModeService.find(params.id);

    return response;

  }

  public async findBy({ request }: HttpContextContract): Promise<UserPayMode | null> {

    const urlParams = await request.validate({
      schema: schema.create({
        key: schema.string(),
        value : schema.string()
      })
    });

    const { key, value } = urlParams;

    const response: UserPayMode | null = await this.userPayModeService.fndBy(key, value);

    return response;
    
  }

  public async update({ params, request }: HttpContextContract): Promise<SaveUpdateResponse<UserPayMode>> {

    try {

      const data: UserPayModeFormData = await request.validate(UserPayModeValidator);
      const response: SaveUpdateResponse<UserPayMode> = await this.userPayModeService.update(params.id, data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async destroy({ params }: HttpContextContract): Promise<SaveUpdateResponse<UserPayMode> | any> {

    try {

      await this.userPayModeService.destroy(params.id);

      return {status: true};
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

}
