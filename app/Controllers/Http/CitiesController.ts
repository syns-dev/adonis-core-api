/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CityValidator from 'App/Validators/CityValidator';
import CityService from 'App/Services/Cities/CityService';
import City from 'App/Models/City';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { CityFormData, RequestParams } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class CitiesController {
  
  private cityService = new CityService();

  public async index({request}: HttpContextContract): Promise<City[]> {

    const urlParams: RequestParams = await request.validate(RequestValidator);

    const cities: City[] = await this.cityService.getAll(urlParams);
    
    return cities;
  
  }

  public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<City>> {

    try {

      const data: CityFormData = await request.validate(CityValidator);
      const response: SaveUpdateResponse<City> = await this.cityService.store(data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async show({ params }: HttpContextContract): Promise<City | null> {

    const response: City | null = await this.cityService.find(params.id);

    return response;

  }

  public async update({ params, request }: HttpContextContract): Promise<SaveUpdateResponse<City>> {

    try {

      const data: CityFormData = await request.validate(CityValidator);
      const response: SaveUpdateResponse<City> = await this.cityService.update(params.id, data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async destroy({ params }: HttpContextContract): Promise<Boolean | any> {

    try {
      await this.cityService.destroy(params.id);

      return {status: true};
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }
}
