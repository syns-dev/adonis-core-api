import Rate from "App/Models/Rate";
import RateDAO from "App/DAO/Rates/RateDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class RateService {

    private rateDAO = new RateDAO();

    public async getAll(urlParams: RequestParams): Promise<Rate[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let rates: Rate[];

        if(keyword !== undefined && field !== undefined ){
            rates = await this.rateDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            rates = await this.rateDAO.getAllBy(urlParams);
        }else{
            rates = await this.rateDAO.getAll(urlParams);
        }

        return rates;
        
    }

    public async store(data: any): Promise<SaveUpdateResponse<Rate>> {
        const rate: Rate = new Rate();

        rate.currencyId = data.currency_id;
        rate.currencyToId = data.currency_to_id;
        rate.amount = data.amount;
        rate.isDefault = data.isDefault;
    
        let response: SaveUpdateResponse<Rate> = await this.rateDAO.save(rate);
    
        return response;
    }

    public find(uid: string): Promise<Rate | null> {
        return this.rateDAO.get(uid);
    }

    public async update(uid: number, data: any): Promise<SaveUpdateResponse<Rate>> {

        const rate: Rate | null = await Rate.findBy('uid', uid);

        let response: SaveUpdateResponse<Rate> = {status: false};

        if (rate) {

            rate.currencyId = data.currency_id;
            rate.currencyToId = data.currency_to_id;
            rate.amount = data.amount;
            rate.isDefault = data.isDefault;

            response = await this.rateDAO.update(rate);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const rate: Rate | null = await Rate.findBy('uid', uid);
        let response: boolean = false;

        if(rate){
            response = await this.rateDAO.delete(rate);
        }

        return response;
        
    }


}

export default RateService;