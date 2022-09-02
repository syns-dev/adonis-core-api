import City from "App/Models/City";
import CityDAO from "App/DAO/Cities/CityDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class CityService {

    private cityDAO = new CityDAO();

    public async getAll(urlParams: RequestParams): Promise<City[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let cities: City[];

        if(keyword !== undefined && field !== undefined ){
            cities = await this.cityDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            cities = await this.cityDAO.getAllBy(urlParams);
        }else{
            cities = await this.cityDAO.getAll(urlParams);
        }

        return cities;
        
    }

    public async store(data: any): Promise<SaveUpdateResponse<City>> {
        const city: City = new City();

        city.name = data.name;
    
        let response: SaveUpdateResponse<City> = await this.cityDAO.save(city);
    
        return response;
    }

    public find(uid: string) {
        return this.cityDAO.get(uid);
    }

    public async update(uid: string, data: any): Promise<SaveUpdateResponse<City>> {

        const city: City | null = await City.findBy('uid', uid);

        let response: SaveUpdateResponse<City> = {status: false};

        if (city) {

            city.name = data.name;

            response = await this.cityDAO.update(city);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const city: City | null = await City.findBy('uid', uid);
        let response: boolean = false;

        if(city){
            response = await this.cityDAO.delete(city);
        }

        return response;
        
    }


}

export default CityService;