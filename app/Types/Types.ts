import User from "App/Models/User";

export type RequestParams = {
    page?: number;
    per_page?: number;
    keyword? : any;
    field? : string;
    is_deleted?: boolean;
    key?: string;
    value?: any
};

export type AddressFormData = {
    city_id: number;
    number?: string;
    street: string;
    district: string;
    reference?: string;
    phone_number?: string;
    longitude?: string;
    latitude?: string;
    description?: string
};

export type CityFormData = {
    name: string;
    description?: string
};

export type CurrencyFormData = {
    name: string;
    description?: string
};

export type FeatureFormData = {
    name: string;
    url?: string;
    parent_id?: number;
    position?: number;
    description?: string
};

export type RateFormData = {
    currency_id: number;
    currency_to_id: number;
    amount: number;
};

export type PermissionFormData = { 
    role_id: number; 
    feature_id: number; 
    can_create: boolean; 
    can_read: boolean; 
    can_update: boolean; 
    can_delete: boolean 
};

export type RoleFormData = {
    name: string;
    description?: string
};

export type UserPayModeFormData = {
    user_id: number;
    pay_mode_id: number;
    number: string;
};

export type PayModeFormData = {
    name: string;
    description?: string;
};

export type UserFromData = {
    role_id: number;
    name: string;
    email?: string;
    phone?: string;
    password?: string;
};

export type OrangeTokenResponse = {
    token_type: string;
    access_token: string;
}

export type LoginPhoneCredentials = {
    phone: string;
    new_phone?: string;
    password: string;
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type AuthResponse = {
    status: boolean; 
    access_token?: string; 
    user?: User | null;
    errors?: any
};