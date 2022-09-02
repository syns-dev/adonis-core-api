import type { EventsList } from '@ioc:Adonis/Core/Event';
import SmsService from 'App/Services/SmsService';

const appConfig: {name: string} = require('../../package.json');

export default class AuthListener {

    public async sendSms(user: EventsList['login:phone']): Promise<void> {
        const smsService: SmsService = new SmsService();
        await smsService.send(user.phone, `${user.otpCode}: Votre code de validation ${appConfig.name}`);
    }

}
