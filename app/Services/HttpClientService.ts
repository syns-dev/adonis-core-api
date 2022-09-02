const axios = require('axios').default;

class HttpClientService{

    public async get(url: string, authorization?: string): Promise<any> {
        try {
            const request: Object = {
                url: url,
                method: 'GET',
                headers: {
                    'Authorization': authorization,
                    'Accept': 'application/json'
                    
                }
            };

            const response = await axios(request);
            
            return response.data;
            
        } catch (error) {
            return error;
        }
        
    }

    public async send(url: string, data: Object, method: string = 'POST', authorization?: string, contentType: string = 'application/json'): Promise<any> {

        try {
            const request: Object = {
                url: url,
                method: method,
                headers: {
                    'Authorization': authorization,
                    'Content-Type': contentType,
                    'Accept': 'application/json'
                    
                },
                data: data,
            };
    
            const response: any = await axios(request);

            return response.data;

        } catch (error) {
            return error;
        }
        
    }

}

export default HttpClientService;