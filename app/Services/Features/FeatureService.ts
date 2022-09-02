import Feature from "App/Models/Feature";
import FeatureDAO from "App/DAO/Features/FeatureDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class FeatureService {

    private featureDAO = new FeatureDAO();

    public async getAll(urlParams: RequestParams): Promise<Feature[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let features: Feature[];

        if(keyword !== undefined && field !== undefined ){
            features = await this.featureDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            features = await this.featureDAO.getAllBy(urlParams);
        }else{
            features = await this.featureDAO.getAll(urlParams);
        }

        return features;
        
    }

    public async store(data: any): Promise<SaveUpdateResponse<Feature>> {
        const feature: Feature = new Feature();

        feature.name = data.name;
        feature.description = data.description;
        feature.featureId = data.parent_id;
        feature.position = data.position;
        feature.url = data.url;
    
        let response: SaveUpdateResponse<Feature> = await this.featureDAO.save(feature);
    
        return response;
    }

    public find(uid: string): Promise<Feature | null> {
        return this.featureDAO.get(uid);
    }

    public async update(uid: string, data: any): Promise<SaveUpdateResponse<Feature>> {

        const feature: Feature | null = await Feature.findBy('uid', uid);

        let response: SaveUpdateResponse<Feature> = {status: false};

        if (feature) {

            feature.name = data.name;
            feature.description = data.description;
            feature.featureId = data.parent_id;
            feature.position = data.position;
            feature.url = data.url;

            response = await this.featureDAO.update(feature);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const feature: Feature | null = await Feature.findBy('uid', uid);
        let response: boolean = false;

        if(feature){
            response = await this.featureDAO.delete(feature);
        }

        return response;
        
    }


}

export default FeatureService;