import axios from 'axios';
import router from '../router';
import { Message } from 'element-ui';

// Message.error("error")

/*
* 提示函数
* 显示错误提示，1秒后消失
* */
const tip = msg =>{
    Message({
        type: 'error',
        message: msg,
        duration: 1000
    })
}

/*
* 跳转登录页
* 携带当前页面路由，以期在登录页面完成登录后返回当前页面
* */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

/*
* 请求失败后的错误统一处理
* @param { Number } status 请求失败的状态码
* */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break
        // 403: token过期
        // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            localStoragere.removeItem('token');
            setTimeout(()=> {
                toLogin();
            },1000);
            break;
        // 404请求不存在
            tip('请求的资源不存在');
            break;
        default:
            console.log(other)
    }
}

/ 创建axios实例
const service = axios.create({
    timeout: 5000
});
// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


/*
* 请求拦截器
* */

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

/*
* 响应拦截器
* */

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
