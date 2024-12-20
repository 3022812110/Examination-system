import axios from 'axios';

const instance = axios.create({ 
  
});

export type AxiosRes<T = ResData> = {
    config:Object,
    data:T,
    headers:any,
    request:any,
    status:number,
    statusText:string,
}

export type ResData<T = any> = {
    code:number,
    msg:string,
    data: T
}

export default instance;