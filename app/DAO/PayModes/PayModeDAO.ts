import DAO, { SaveUpdateResponse } from "../Dao";
import PayMode from "App/Models/PayMode";
import { RequestParams } from "App/Types/Types";

class PayModeDAO implements DAO<PayMode>{

    public async getAll(params: RequestParams): Promise<PayMode[]> {

        const { page = 1, per_page, is_deleted = false } = params;
        
        const payModes: PayMode[] = await PayMode.query()
                .where('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return payModes;
    }

    public async getAllBy(params: RequestParams): Promise<PayMode[]> {

        const { page = 1, per_page, is_deleted = false, key = '', value } = params;
        
        const payModes: PayMode[] = await PayMode.query()
                .where('is_deleted', is_deleted)
                .where(key, value)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return payModes;
    }

    public async get(uid: string): Promise<PayMode | any> {
        const payMode: PayMode | null = await PayMode.findBy('uid', uid);

        return payMode;
    }

    public async search(filters: RequestParams): Promise<PayMode[]> {

        const { page = 1, per_page, keyword, field, is_deleted = false } = filters;
        
        const payModes: PayMode[] = await PayMode.query()
                .where(`${field}`, 'LIKE', '%'+keyword+'%')
                .andWhere('is_deleted', is_deleted)
                .orderBy('id', 'desc')
                .paginate(page, per_page);

        return payModes;
    }

    public async save(payMode: PayMode): Promise<SaveUpdateResponse<PayMode>> {

        let response: SaveUpdateResponse<PayMode> = {status: false};

        await payMode.save().then((payMode: PayMode) => {
            response.status = true;
            response.data = payMode;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;
    }

    public async update(payMode: PayMode): Promise<SaveUpdateResponse<PayMode>> {

        let response: SaveUpdateResponse<PayMode> = {status: false};

        await payMode.save().then((payMode: PayMode) => {
            response.status = true;
            response.data = payMode;
        }).catch((error) => {
            response.status = false;
            response.errors = error;
        });

        return response;

    }

    public async delete(payMode: PayMode): Promise<boolean | any> {

        payMode.isDeleted = true;

        let status: boolean | any = false;

        await payMode.save().then((payMode: PayMode) => {
            status = payMode.isDeleted;
        }).then((error: any) => {
            status = error;
        });

        return status;

    }
}

export default PayModeDAO;