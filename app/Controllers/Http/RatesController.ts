import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RateValidator from 'App/Validators/RateValidator';
import RateService from 'App/Services/Rates/RateService';
import Rate from 'App/Models/Rate';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { RateFormData, RequestParams } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class RatesController {
  
  private rateService = new RateService();

  public async index({request}: HttpContextContract): Promise<Rate[]> {

    const urlParams: RequestParams = await request.validate(RequestValidator);

    const rates: Rate[] = await this.rateService.getAll(urlParams);
    
    return rates;
  
  }

  public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<Rate>> {

    try {

      const data: RateFormData = await request.validate(RateValidator);
      const response: SaveUpdateResponse<Rate> = await this.rateService.store(data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async show({ params }: HttpContextContract): Promise<Rate | null> {

    const response: Rate | null = await this.rateService.find(params.id);

    return response;

  }

  public async update({ params, request }: HttpContextContract): Promise<SaveUpdateResponse<Rate>> {

    try {

      const data: RateFormData = await request.validate(RateValidator);
      const response: SaveUpdateResponse<Rate> = await this.rateService.update(params.id, data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async destroy({ params }: HttpContextContract): Promise<SaveUpdateResponse<Rate> | any> {

    try {

      await this.rateService.destroy(params.id);

      return {status: true};
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

}
