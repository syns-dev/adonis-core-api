/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CurrencyValidator from 'App/Validators/CurrencyValidator';
import CurrencyService from 'App/Services/Currencies/CurrencyService';
import Currency from 'App/Models/Currency';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { CurrencyFormData, RequestParams } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class CurrenciesController {
  private currencyService = new CurrencyService();

  public async index({request}: HttpContextContract): Promise<Currency[]> {

    const urlParams: RequestParams = await request.validate(RequestValidator);

    const currencies: Currency[] = await this.currencyService.getAll(urlParams);
    
    return currencies;
  
  }

  public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<Currency>> {

    try {

      const data: CurrencyFormData = await request.validate(CurrencyValidator);
      const response: SaveUpdateResponse<Currency> = await this.currencyService.store(data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async show({ params }: HttpContextContract): Promise<Currency | null> {

    const response: Currency | null = await this.currencyService.find(params.id);

    return response;

  }

  public async update({ params, request }: HttpContextContract): Promise<SaveUpdateResponse<Currency>> {

    try {

      const data: CurrencyFormData = await request.validate(CurrencyValidator);
      const response: SaveUpdateResponse<Currency> = await this.currencyService.update(params.id, data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async destroy({ params }: HttpContextContract): Promise<SaveUpdateResponse<Currency> | any> {

    try {

      await this.currencyService.destroy(params.id);

      return {status: true};

      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }
}
