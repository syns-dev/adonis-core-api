import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import UserService from 'App/Services/Users/UserService';
import User from 'App/Models/User';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { RequestParams, UserFromData } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class UsersController {
 
    private userService = new UserService();

    public async index({request}: HttpContextContract): Promise<User[]> {
  
      const urlParams: RequestParams = await request.validate(RequestValidator);
  
      const users: User[] = await this.userService.getAll(urlParams);
      
      return users;
    
    }
  
    public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<User>> {
  
      try {
  
        const data: UserFromData = await request.validate(UserValidator);
        const response: SaveUpdateResponse<User> = await this.userService.store(data);
  
        return response;
        
      } catch (error) {
        return {status: false, errors: error.messages.errors};
      }
  
    }
  
    public async show({ params }: HttpContextContract): Promise<User | null> {
  
      const response: User | null = await this.userService.find(params.id);
  
      return response;
  
    }
  
    public async update({ params, request }: HttpContextContract): Promise<SaveUpdateResponse<User>> {
  
      try {
  
        const data: UserFromData = await request.validate(UserValidator);
        const response: SaveUpdateResponse<User> = await this.userService.update(params.id, data);
  
        return response;
        
      } catch (error) {
        return {status: false, errors: error.messages.errors};
      }
  
    }
  
    public async destroy({ params }: HttpContextContract): Promise<SaveUpdateResponse<User> | any> {
  
      try {
  
        await this.userService.destroy(params.id);
  
        return {status: true};
        
      } catch (error) {
        return {status: false, errors: error.messages.errors};
      }
  
    }
}
