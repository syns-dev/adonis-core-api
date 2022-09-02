import PayMode from "App/Models/PayMode";
import PayModeDAO from "App/DAO/PayModes/PayModeDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class PayModeService {

    private payModeDAO = new PayModeDAO();

    public async getAll(urlParams: RequestParams): Promise<PayMode[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let payModes: PayMode[];

        if(keyword !== undefined && field !== undefined ){
            payModes = await this.payModeDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            payModes = await this.payModeDAO.getAllBy(urlParams);
        }else{
            payModes = await this.payModeDAO.getAll(urlParams);
        }

        return payModes;
        
    }

    public async store(data: any): Promise<SaveUpdateResponse<PayMode>> {
        const payMode: PayMode = new PayMode();

        payMode.name = data.name;
        payMode.description = data.description;
    
        let response: SaveUpdateResponse<PayMode> = await this.payModeDAO.save(payMode);
    
        return response;
    }

    public find(uid: string): Promise<PayMode | null> {
        return this.payModeDAO.get(uid);
    }

    public async update(uid: string, data: any): Promise<SaveUpdateResponse<PayMode>> {

        const payMode: PayMode | null = await PayMode.findBy('uid', uid);

        let response: SaveUpdateResponse<PayMode> = {status: false};

        if (payMode) {

            payMode.name = data.name;
            payMode.description = data.description;

            response = await this.payModeDAO.update(payMode);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const payMode: PayMode | null = await PayMode.findBy('uid', uid);
        let response: boolean = false;

        if(payMode){
            response = await this.payModeDAO.delete(payMode);
        }

        return response;
        
    }


}

export default PayModeService;