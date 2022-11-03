import axios from "axios"
//配置axios文件
const instance = axios.create({
    baseURL: '/api',//要发送请求的https路径
    timeout: 5000 ,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Accept: 'application/json'
    }
});
// 请求拦截器
instance.interceptors.request.use((config) => {
    /*if (!config.headers["Content-Type"]) {
        config.headers = {
            "Content-Type": "application/json",
            // application/x-www-form-urlencoded
        };
    }*/
    // 在发送请求之前做些什么
    // config.headers[""]=token
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//响应拦截器
instance.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response;
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});
//导出变量
export default instance


