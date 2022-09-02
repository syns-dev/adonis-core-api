import DAO, { SaveUpdateResponse } from "../Dao";
import Feature from "App/Models/Feature";
import { RequestParams } from "App/Types/Types";

class FeatureDAO implements DAO<Feature>{

    public async getAll(params: any): Promise<Feature[]> {

        const { page, per_page, is_deleted } = params;
        
        const features: Feature[] = await Feature.query()
                .where('is_deleted', is_deleted)
                .orderBy('position', 'asc')
                .preload('parent')
                .paginate(page, per_page);

        return features;
    }

    public async getAllBy(params: RequestParams): Promise<Feature[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const features: Feature[] = await Feature.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .preload('parent')
                .paginate(page, per_page);

        return features;
    }

    public async get(uid: string): Promise<Feature | null> {
        const feature: Feature | null = await Feature.findBy('uid', uid);

        if(feature){
            feature.load('parent');
        }

        return feature;
    }

    public async search(filters: RequestParams): Promise<Feature[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const features: Feature[] = await Feature.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('parent')
                .paginate(page, per_page);

        return features;
    }

    public async save(feature: Feature): Promise<SaveUpdateResponse<Feature>> {

        let response: SaveUpdateResponse<Feature> = {status: false};

        await feature.save().then((feature: Feature) => {
            response.status = true;
            response.data = feature;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;
    }

    public async update(feature: Feature): Promise<SaveUpdateResponse<Feature>> {

        let response: SaveUpdateResponse<Feature> = {status: false};

        await feature.save().then((feature: Feature) => {
            response.status = true;
            response.data = feature;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;

    }

    public async delete(feature: Feature): Promise<boolean | any> {

        feature.isDeleted = true;

        let status: boolean | any = false;

        await feature.save().then((feature: Feature) => {
            status = feature.isDeleted;
        }).then((error: any) => {
            status = error;
        });

        return status;

    }
}

export default FeatureDAO;