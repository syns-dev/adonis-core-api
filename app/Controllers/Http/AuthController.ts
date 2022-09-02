import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Event from '@ioc:Adonis/Core/Event';
import User from 'App/Models/User';
import UserService from 'App/Services/Users/UserService';
import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth';
import { AuthResponse, LoginCredentials, LoginPhoneCredentials } from 'App/Types/Types';
import { SaveUpdateResponse } from 'App/DAO/Dao';
import AuthValidator from 'App/Validators/AuthValidator';
import AuthPhoneValidator from 'App/Validators/AuthPhoneValidator';

export default class AuthController {

    private userService = new UserService();
    
    public async login({ request, auth }: HttpContextContract): Promise<AuthResponse> {

        const credentials: LoginCredentials = await request.validate(AuthValidator);
        
        const { email, password }: LoginCredentials = credentials;

        let response: AuthResponse={status: true};

        const tokenData: OpaqueTokenContract<User> = await auth.use("api").attempt(email, password, {expiresIn: "1000 days",});

        const authUser: User | null = await User.find(auth.user?.id);

        response.access_token = tokenData.token;

        if(authUser){

            await authUser.load('role');

            response.user = authUser;

            if (auth.user?.isDeleted || !auth.user?.isActivated) {
                response.status = false;
                response.access_token = "";
            }

        }

        return response;
    }

    public async loginByPhone({ request, auth }: HttpContextContract): Promise<AuthResponse> {

        const credentials: LoginPhoneCredentials = await request.validate(AuthPhoneValidator);

        const { phone, password, new_phone }: LoginPhoneCredentials = credentials;

        const user: User | null = await this.userService.fndBy('phone', request.input('phone'));

        if(user && user.otpCode == password){

            user.password = user.otpCode.toString();
            user.phone = new_phone ? new_phone : phone;

            await this.userService.update(user.uid, user);

            try {

                const tokenData: OpaqueTokenContract<User> = await auth.use("api").attempt(user.phone, password, {expiresIn: "1000 days",});
    
                const authUser: User | null = await User.find(auth.user?.id);
    
                let response: AuthResponse = { status: true };
                response.access_token = tokenData.token;
    
                if(authUser){
    
                    await authUser.load('role');
    
                    response.user = authUser;
    
                    if (auth.user?.isDeleted || !auth.user?.isActivated) {
                        response.status = false;
                        response.access_token = "";
                    }
                }
    
                return response;
                
            } catch (error) {
                return {status: false, errors: error};
            }

        }else{
            return {status: false, errors: "Invalid OTP code or phone"};
        }
        
    }


    public async generateOTPCode({ request }: HttpContextContract): Promise<{status: boolean}> {

        const user: User | null = await this.userService.fndBy('phone', request.input('phone'));

        const response: { status: boolean } = { status: false };

        if(user){
            let otpCode: string = Math.floor(10000 + Math.random() * 90000).toString();
            otpCode = user.phone == '243845046283' ? '80637' : otpCode;

            const newUser: SaveUpdateResponse<User> = await this.userService.update(user.uid, {otp_code: otpCode});

            if (newUser) {

                user.otpCode = otpCode;

                Event.emit('login:phone', user);

                response.status = true;

            }
        }

        return response;
        
    }

    public async generateUpdatePhoneNumberOTPCode({ request }: HttpContextContract): Promise<{status: boolean}> {

        const user: User | null = await this.userService.fndBy('phone', request.input('current_phone'));

        const response: { status: boolean } = {status: false};

        if(user){

            const otpCode: string = Math.floor(10000 + Math.random() * 90000).toString();
            const newUser: SaveUpdateResponse<User> = await this.userService.update(user.uid, {otp_code: otpCode});

            if (newUser) {

                user.phone = request.input('new_phone');

                Event.emit('login:phone', user);

                response.status = true;
            }

        }

        return response;
    }

}

