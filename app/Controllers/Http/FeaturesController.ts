/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FeatureValidator from 'App/Validators/FeatureValidator';
import FeatureService from 'App/Services/Features/FeatureService';
import Feature from 'App/Models/Feature';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import { FeatureFormData, RequestParams } from 'App/Types/Types';
import RequestValidator from 'App/Validators/RequestValidator';

export default class FeaturesController {
   
    private featureService = new FeatureService();

    public async index({request}: HttpContextContract): Promise<Feature[]> {
  
      const urlParams: RequestParams = await request.validate(RequestValidator);
  
      const features: Feature[] = await this.featureService.getAll(urlParams);
      
      return features;
    
    }
  
    public async store({ request }: HttpContextContract): Promise<SaveUpdateResponse<Feature>> {
  
      try {
  
        const data: FeatureFormData = await request.validate(FeatureValidator);
        const response : SaveUpdateResponse<Feature> = await this.featureService.store(data);
  
        return response;
        
      } catch (error) {
        return {status: false, errors: error.messages.errors};
      }
  
    }
  
    public async show({ params }: HttpContextContract): Promise<Feature | null> {
  
      const response: Feature | null = await this.featureService.find(params.id);
  
      return response;
  
    }
  
    public async update({ params, request }: HttpContextContract): Promise<SaveUpdateResponse<Feature>> {
  
      try {
  
        const data: FeatureFormData = await request.validate(FeatureValidator);
        const response: SaveUpdateResponse<Feature> = await this.featureService.update(params.id, data);
  
        return response;
        
      } catch (error) {
        return {status: false, errors: error.messages.errors};
      }
  
    }
  
    public async destroy({ params }: HttpContextContract): Promise<SaveUpdateResponse<Feature> | any> {
  
      try {
  
        await this.featureService.destroy(params.id);
  
        return {status: true};
        
      } catch (error) {
        return {status: false, errors: error.messages.errors};
      }
  
    }
}
