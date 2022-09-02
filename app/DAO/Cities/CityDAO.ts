import DAO, { SaveUpdateResponse } from "../Dao";
import City from "App/Models/City";
import { RequestParams } from "App/Types/Types";

class CityDAO implements DAO<City>{

    public async getAll(params: RequestParams): Promise<City[]> {

        const { page = 1, per_page, is_deleted = 0 } = params;
        
        const cities: City[] = await City.query()
                .where('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return cities;
    }

    public async getAllBy(params: RequestParams): Promise<City[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const cities: City[] = await City.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return cities;
    }

    public async get(uid: string): Promise<City | null> {
        const city: City | null = await City.findBy('uid', uid);

        return city;
    }

    public async search(filters: RequestParams): Promise<City[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const cities: City[] = await City.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return cities;
    }

    public async save(city: City): Promise<SaveUpdateResponse<City>> {

        let response: SaveUpdateResponse<City> = { status: false };

        await city.save().then((record) => {
            response.status = true;
            response.data = record;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;
    }

    public async update(city: City): Promise<SaveUpdateResponse<City>> {

        let response: SaveUpdateResponse<City> = { status: false };

        await city.save().then((city: City) => {
            response.status = true;
            response.data = city;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;

    }

    public async delete(city: City): Promise<boolean | any> {

        city.isDeleted = true;

        let status: boolean | any = false;

        await city.save().then((city: City) => {
            status = city.isDeleted;
        }).then((error: any) => {
            status = error;
        });

        return status;

    }
}

export default CityDAO;