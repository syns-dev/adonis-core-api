import HttpClientService from "./HttpClientService";
import Env from '@ioc:Adonis/Core/Env';
import { OrangeTokenResponse } from "App/Types/Types";

class SmsService {

    public async send(phone: string, message: string) {

        const httpClientService: HttpClientService = new HttpClientService();

        const token: string = await this.getOrangeApiToken();

        const data: Object = {
            outboundSMSMessageRequest: {
                address: `tel:+${phone}`,
                senderAddress: 'tel:+2430000',
                outboundSMSTextMessage: {
                    message: message
                }
            }
        };

        await httpClientService.send(Env.get('ORANGE_SMS_API_URL'), data, 'POST', token);
    }

    public async getOrangeApiToken(): Promise<string> {

        const httpClientService = new HttpClientService();

        let token: string = '';

        const data: URLSearchParams = new URLSearchParams();
        data.append('grant_type', 'client_credentials');

        const response: OrangeTokenResponse = await httpClientService.send(Env.get('ORANGE_SMS_TOKEN_URL'), data, 'POST', Env.get('ORANGE_SMS_API_TOKEN'), 'application/x-www-form-urlencoded');

        if(response){
            token = `${response.token_type} ${response.access_token}`;
        }

        return token;
    }
    
}

export default SmsService;