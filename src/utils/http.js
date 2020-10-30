import axios from "axios";
import qs from "qs";
axios.defaults.timeout = 1800000;
import crypto from "@/common/js/crypto.js";
import store from '@/store';

//post请求头
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";

//全局配置token
// axios.defaults.headers.common['Authorization'] = "bearer " + store.getters['user/getUserInfo'].token;
// console.log(JSON.parse(crypto.decrypt(sessionStorage.getItem("sessionUser"))).adminData.token)
// axios.defaults.headers.common['Authorization'] = "bearer " + JSON.parse(crypto.decrypt(sessionStorage.getItem("sessionUser"))).adminData.token;
//axios.defaults.headers.common['Authorization'] = "bearer " + store.getters['user/getUserInfo'].token;

// 环境的切换,vue-cli3 开发就是dev,打包就是production
if (process.env.NODE_ENV == "development") {
    // axios.defaults.baseURL = "http://47.107.146.154:405/"

  axios.defaults.baseURL = "http://192.168.0.117:40050/"
  // axios.defaults.baseURL = "http://192.168.0.115:50090/"
  // axios.defaults.baseURL = "http://10.1.10.86:50090/"


   // axios.defaults.baseURL = "http://172.20.2.148:50090/"
  //  axios.defaults.baseURL = "http://xwf.natapp1.cc/"
// axios.defaults.baseURL = "http://192.168.0.153:40050"
  //  axios.defaults.baseURL = "http://192.168.0.110:50090"


     //  axios.defaults.baseURL = "http://192.168.0.167:40050"



// axios.defaults.baseURL = "http://47.107.146.154:50090/"
//axios.defaults.baseURL = "http://192.168.0.159:40050"


} else if (process.env.NODE_ENV == "production") {


   axios.defaults.baseURL = "http://47.107.146.154:50090/" // 阿里云
//    axios.defaults.baseURL = "http://172.20.2.148:50090/" // 温岭

   // axios.defaults.baseURL = "http://10.1.10.86:50090/" // 省中医
  //  axios.defaults.baseURL = "http://10.1.10.86:50090/" // 省中医


}



// //请求拦截
axios.interceptors.request.use(
    request => {
        // console.log("请求拦截");
        // if (store.getters['user/isLogin']) {//如果登录过,才拿这个token
        if (sessionStorage.getItem("sessionUser")) {
            // request.headers.common['Authorization'] = "bearer " + store.getters['user/getUserInfo'].token;
            request.headers.common['Authorization'] = JSON.parse(crypto.decrypt(sessionStorage.getItem("sessionUser"))).adminData.token;
        }
        return request;
    },
    error => {
        return Promise.error(error);
    }
);
//响应拦截器
axios.interceptors.response.use(
    response => {
        // console.log("响应拦截");
        // console.log(response);
        // 在这里做响应的判断,可以做响应错误的拦截
        if (response.data.code == 403) {
            // showErrorMsg(response.data.msg);//这个封装在 起来了方法
        }
        return Promise.resolve(response);
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            // console.log("错误处理");
            //状态码错误处理
            return Promise.reject(error.response);
        }
    }
);
//get请求封装  promise封装了方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data);
        })
    })

}
//post请求封装,qs库将对象转换为&连接的字符串表单格式   qs.stringify(params)
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}
//put请求方式
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .put(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}

//delete方法的删除参数有点问题{ data: params }
export function deletes(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, { data: params })
            .then(res => {
                resolve(res.data);
               // console.log("成功删除");
            })
            .catch(err => {
                reject(err.data);
               // console.log("删除失败");
            });
    });
}
