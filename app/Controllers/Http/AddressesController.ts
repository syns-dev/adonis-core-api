import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AddressValidator from 'App/Validators/AddressValidator';
import AddressService from 'App/Services/Address/AddressService';
import Address from 'App/Models/Address';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { AddressFormData, RequestParams } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class AddressesController {
  
  private addressService = new AddressService();

  public async index({request}: HttpContextContract): Promise<Address[]> {

    const urlParams: RequestParams = await request.validate(RequestValidator);

    const addresses: Address[] = await this.addressService.getAll(urlParams);
    
    return addresses;
  
  }

  public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<Address>> {
  
    try {

      const data: AddressFormData  = await request.validate(AddressValidator);
      const response: SaveUpdateResponse<Address> = await this.addressService.store(data);

      return response;

      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async show({ params }: HttpContextContract): Promise<Address | null> {

    const response: Address | null = await this.addressService.find(params.id);

    return response;

  }

  public async update({ params, request }: HttpContextContract): Promise<SaveUpdateResponse<Address>> {

    try {

      const data: AddressFormData = await request.validate(AddressValidator);
      const response: SaveUpdateResponse<Address> = await this.addressService.update(params.id, data);

      return response;
      
    } catch (error) {
      return {status: false, errors: error.messages.errors};
    }

  }

  public async destroy({ params }: HttpContextContract): Promise<boolean | any> {

    try {

      await this.addressService.destroy(params.id);

      return {status: true};
      
    } catch (error) {
      
      return {status: false, errors: error.messages.errors};
      
    }

  }
}
