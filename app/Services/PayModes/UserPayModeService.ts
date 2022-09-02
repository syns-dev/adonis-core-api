import UserPayMode from "App/Models/UserPayMode";
import UserPayModeDAO from "App/DAO/PayModes/UserPayModeDAO";
import { SaveUpdateResponse } from "App/DAO/Dao";
import { RequestParams } from "App/Types/Types";

class UserPayModeService {

    private userPayModeDAO = new UserPayModeDAO();

    public async getAll(urlParams: RequestParams): Promise<UserPayMode[]> {

        let { page, per_page, keyword, field, is_deleted, key, value } = urlParams;

        urlParams.is_deleted = (is_deleted == undefined) ? false : is_deleted;
        urlParams.page = (page == undefined) ? 1 : page;
        urlParams.per_page= (per_page == undefined) ? 10 : per_page;

        let userPayModes: UserPayMode[];

        if(keyword !== undefined && field !== undefined ){
            userPayModes = await this.userPayModeDAO.search(urlParams);
        }else if(key !== undefined && value !== undefined){
            userPayModes = await this.userPayModeDAO.getAllBy(urlParams);
        }else{
            userPayModes = await this.userPayModeDAO.getAll(urlParams);
        }

        return userPayModes;
        
    }

    public async store(data: any): Promise<SaveUpdateResponse<UserPayMode>> {
        const userPayMode: UserPayMode = new UserPayMode();

        userPayMode.userId = data.user_id;
        userPayMode.payModeId = data.pay_mode_id;
        userPayMode.number = data.number;
    
        let response: SaveUpdateResponse<UserPayMode> = await this.userPayModeDAO.save(userPayMode);
    
        return response;
    }

    public find(uid: string): Promise<UserPayMode | null> {
        return this.userPayModeDAO.get(uid);
    }

    public fndBy(field: string, value: any): Promise<UserPayMode | null> {
        return this.userPayModeDAO.findBy(field, value);
    }

    public async update(uid: string, data: any): Promise<SaveUpdateResponse<UserPayMode>> {

        const userPayMode: UserPayMode | null = await UserPayMode.findBy('uid', uid);

        let response: SaveUpdateResponse<UserPayMode> = {status: true};

        if (userPayMode) {

            userPayMode.userId = data.user_id;
            userPayMode.payModeId = data.pay_mode_id;
            userPayMode.number = data.number;

            response = await this.userPayModeDAO.update(userPayMode);
        }

        return response;
    }

    public async destroy(uid: string): Promise<boolean | any> {

        const userPayMode: UserPayMode | null = await UserPayMode.findBy('uid', uid);
        let response: boolean = false;

        if(userPayMode){
            response = await this.userPayModeDAO.delete(userPayMode);
        }

        return response;
        
    }


}

export default UserPayModeService;