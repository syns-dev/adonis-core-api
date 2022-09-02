
export default interface DAO<T>{

    getAll(params: any): Promise<Array<T>>;
    get(uid: string): Promise<T | null>;
    search(filters: any): Promise<Array<T>>;
    save(object: T): Promise<SaveUpdateResponse<T>>;
    update(object: T): Promise<SaveUpdateResponse<T>>;
    delete(object: T): Promise<boolean | any>;

}

export interface SaveUpdateResponse<T>{
    status: boolean;
    data?: T | any;
    errors?: any;
};