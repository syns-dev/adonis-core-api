import Address from "App/Models/Address";
import AddressDAO from "App/DAO/Addresses/AddressDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class AddressService {

    private addressDAO = new AddressDAO();

    public async getAll(urlParams: RequestParams): Promise<Address[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let addresses: Address[];

        if(keyword !== undefined && field !== undefined ){
            addresses = await this.addressDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            addresses = await this.addressDAO.getAllBy(urlParams);
        }else{
            addresses = await this.addressDAO.getAll(urlParams);
        }

        return addresses;
        
    }

    public async store(data: any): Promise<SaveUpdateResponse<Address>> {

        const address: Address = new Address();

        address.cityId = data.city_id;
        address.number = data.number;
        address.street = data.street;
        address.district = data.district;
        address.reference = data.reference;
        address.phoneNumber = data.phone_number;
        address.longitude = data.longitude;
        address.latitude = data.latitude;
    
        let response: SaveUpdateResponse<Address> = await this.addressDAO.save(address);
    
        return response;
    }

    public find(uid: string): Promise<Address | null> {
        return this.addressDAO.get(uid);
    }

    public async update(uid: string, data: any): Promise<SaveUpdateResponse<Address>> {

        const address: Address | null = await Address.findBy('udi', uid);

        let response: SaveUpdateResponse<Address> = {status: false};

        if (address) {

            address.cityId = data.city_id;
            address.number = data.number;
            address.street = data.street;
            address.district = data.district;
            address.reference = data.reference;
            address.phoneNumber = data.phone_number;
            address.longitude = data.longitude;
            address.latitude = data.latitude;

            response = await this.addressDAO.update(address);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const address: Address | null = await Address.findBy('uid', uid);
        let response: boolean = false;

        if(address){
            response = await this.addressDAO.delete(address);
        }

        return response;
        
    }


}

export default AddressService;