import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PayModeValidator from 'App/Validators/PayModeValidator';
import PayModeService from 'App/Services/PayModes/PayModeService';
import PayMode from 'App/Models/PayMode';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { PayModeFormData, RequestParams } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class PayModesController {
  
  private payModeService = new PayModeService();

  public async index({request}: HttpContextContract): Promise<PayMode[]> {

    const urlParams: RequestParams = await request.validate(RequestValidator);

    const payModes: PayMode[] = await this.payModeService.getAll(urlParams);
    
    return payModes;
  
  }

  public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<PayMode>> {

    try {

      const data: PayModeFormData = await request.validate(PayModeValidator);
      const response: SaveUpdateResponse<PayMode> = await this.payModeService.store(data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async show({ params }: HttpContextContract): Promise<PayMode | null> {

    const response: PayMode | null = await this.payModeService.find(params.id);

    return response;

  }

  public async update({ params, request }: HttpContextContract): Promise<SaveUpdateResponse<PayMode>> {

    const data: PayModeFormData = await request.validate(PayModeValidator);
    const response: SaveUpdateResponse<PayMode> = await this.payModeService.update(params.id, data);

    return response;

  }

  public async destroy({ params }: HttpContextContract): Promise<SaveUpdateResponse<PayMode> | any> {

    try {

      await this.payModeService.destroy(params.id);

      return {status: true};
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

}
