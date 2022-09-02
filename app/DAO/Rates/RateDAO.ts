import DAO, { SaveUpdateResponse } from "../Dao";
import Rate from "App/Models/Rate";
import { RequestParams } from "App/Types/Types";

class RateDAO implements DAO<Rate>{

    public async getAll(params: RequestParams): Promise<Rate[]> {

        const { page = 1, per_page, is_deleted = false } = params;
        
        const rates: Rate[] = await Rate.query()
                .where('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('currency')
                .preload('currencyTo')
                .paginate(page, per_page);

        return rates;
    }

    public async getAllBy(params: RequestParams): Promise<Rate[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const rates: Rate[] = await Rate.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .preload('currency')
                .preload('currencyTo')
                .paginate(page, per_page);

        return rates;
    }

    public async get(uid: string): Promise<any> {
        const rate: Rate | null = await Rate.findBy('uid', uid);

        if(rate){
            await rate.load('currency');
            await rate.load('currencyTo');
        }

        return rate;
    }

    public async search(filters: RequestParams): Promise<Rate[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const rates: Rate[] = await Rate.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return rates;
    }

    public async save(rate: Rate): Promise<SaveUpdateResponse<Rate>> {

        let response: SaveUpdateResponse<Rate> = {status: false};

        await rate.save().then((rate: Rate) => {
            response.status = true;
            response.data = rate;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;
    }

    public async update(rate: Rate): Promise<SaveUpdateResponse<Rate>> {

        let response: SaveUpdateResponse<Rate> = {status: false};

        await rate.save().then((rate: Rate) => {
            response.status = true;
            response.data = rate;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;

    }

    public async delete(rate: Rate): Promise<boolean | any> {

        rate.isDeleted = true;

        let status: boolean | any = false;

        await rate.save().then((rate: Rate) => {
            status = rate.isDeleted;
        }).then((error: any) => {
            status = error;
        });

        return status;

    }
}

export default RateDAO;