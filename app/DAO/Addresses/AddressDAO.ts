import DAO, { SaveUpdateResponse } from "../Dao";
import Address from "App/Models/Address";
import { RequestParams } from "App/Types/Types";

class AddressDAO implements DAO<Address>{

    public async getAll(params: RequestParams): Promise<Address[]> {

        const { page = 1, per_page, is_deleted = false } = params;
        
        const addresses: Address[] = await Address.query()
                .where('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('city')
                .paginate(page, per_page);

        return addresses;
    }
    
    public async getAllBy(params: RequestParams): Promise<Address[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const addresses: Address[] = await Address.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .preload('city')
                .paginate(page, per_page);

        return addresses;
    }

    public async get(uid: string): Promise<Address | null> {
        const address: Address | null = await Address.findBy('uid', uid);

        if(address){
            await address.load('city');
        }

        return address;
    }

    public async search(filters: RequestParams): Promise<Address[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const addresses: Address[] = await Address.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .preload('city')
                .paginate(page, per_page);

        return addresses;
    }

    public async save(address: Address): Promise<SaveUpdateResponse<Address>> {

        let response: SaveUpdateResponse<Address> = {status: false};

        await address.save().then((address: Address) => {
            response.status = true;
            response.data = address;
        }).catch((error) => {
            response.status = true;
            response.errors = error;
        });

        return response;
    }

    public async update(address: Address): Promise<SaveUpdateResponse<Address>> {

        let response: SaveUpdateResponse<Address> = {status: false};

        await address.save().then((address: Address) => {
            response.status = true;
            response.data = address;
        }).catch((error) => {
            response.status = true;
            response.errors = error;
        });

        return response;

    }

    public async delete(address: Address): Promise<boolean | any> {

        address.isDeleted = true;

        let status: boolean | any = false;

        await address.save().then((address: Address) => {
            status = address.isDeleted;
        }).then((error: any) => {
            status = error;
        });

        return status;

    }
}

export default AddressDAO;