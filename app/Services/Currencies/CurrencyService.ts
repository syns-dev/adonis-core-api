import Currency from "App/Models/Currency";
import CurrencyDAO from "App/DAO/Currencies/CurrencyDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class CurrencyService {

    private currencyDAO = new CurrencyDAO();

    public async getAll(urlParams: RequestParams): Promise<Currency[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let currencies: Currency[];

        if(keyword !== undefined && field !== undefined ){
            currencies = await this.currencyDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            currencies = await this.currencyDAO.getAllBy(urlParams);
        }else{
            currencies = await this.currencyDAO.getAll(urlParams);
        }

        return currencies;
        
    }

    public async store(data: any): Promise<SaveUpdateResponse<Currency>> {
        const currency: Currency = new Currency();

       currency.name = data.name;
       currency.description = data.description;
    
        let response: SaveUpdateResponse<Currency> = await this.currencyDAO.save(currency);
    
        return response;
    }

    public find(uid: string): Promise<Currency | null> {
        return this.currencyDAO.get(uid);
    }

    public async update(uid: string, data: any): Promise<SaveUpdateResponse<Currency>> {

        const currency: Currency | null = await Currency.findBy('uid', uid);

        let response: SaveUpdateResponse<Currency> = {status: false};

        if (currency) {

            currency.name = data.name;
            currency.description = data.description;

            response = await this.currencyDAO.update(currency);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const currency: Currency | null = await Currency.findBy('uid', uid);
        let response: boolean = false;

        if(currency){
            response = await this.currencyDAO.delete(currency);
        }

        return response;
        
    }


}

export default CurrencyService;