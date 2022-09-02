import DAO, { SaveUpdateResponse } from "../Dao";
import Currency from "App/Models/Currency";
import { RequestParams } from "App/Types/Types";

class CurrencyDAO implements DAO<Currency>{

    public async getAll(params: RequestParams): Promise<Currency[]> {

        const { page = 1, per_page, is_deleted = false } = params;
        
        const currencies: Currency[] = await Currency.query()
                .where('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return currencies;
    }

    public async getAllBy(params: RequestParams): Promise<Currency[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const currencies: Currency[] = await Currency.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return currencies;
    }

    public async get(uid: string): Promise<Currency | null> {
        const currency: Currency | null = await Currency.findBy('uid', uid);

        return currency;
    }

    public async search(filters: RequestParams): Promise<Currency[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const currencies: Currency[] = await Currency.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return currencies;
    }

    public async save(currency: Currency): Promise<SaveUpdateResponse<Currency>> {

        let response: SaveUpdateResponse<Currency> = {status: false};

        await currency.save().then((currency: Currency) => {
            response.status = true;
            response.data = currency;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;
    }

    public async update(currency: Currency): Promise<SaveUpdateResponse<Currency>> {

        let response: SaveUpdateResponse<Currency> = {status: false};

        await currency.save().then((currency: Currency) => {
            response.status = true;
            response.data = currency;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;

    }

    public async delete(currency: Currency): Promise<boolean | any> {

        currency.isDeleted = true;

        let status: boolean | any = false;

        await currency.save().then((currency: Currency) => {
            status = currency.isDeleted;
        }).then((error: any) => {
            status = error;
        });

        return status;

    }
}

export default CurrencyDAO;