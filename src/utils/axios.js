// 封装axios请求
// 对错误统一处理

import axios from "axios";
import errorHandle from "./errorHandle";
import store from "@/store";
import publicConfig from "@/config";
const CancelToken = axios.CancelToken;

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.pending = {}; // 全局变量存储不同的url路径
  }
  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      timeout: 10000,
    };
    return config;
  }
  // 设定拦截器
  interceptors(instance) {
    // request
    instance.interceptors.request.use(
      (config) => {
        let isPublic = false;
        publicConfig.publicPath.map(
          (path) => (isPublic = isPublic || path.test(config.url))
        );
        console.log(isPublic, config.url);
        const token = store.state.token;
        if (!isPublic && token) {
          config.headers.Authorization = "Bearer " + token;
        }
        let key = config.url + "&" + config.method;
        this.removePending(key, true);
        config.cancelToken = new CancelToken((c) => {
          this.pending[key] = c;
        });
        return config;
      },
      (err) => {
        errorHandle(err);
        return Promise.reject(err);
      }
    );

    // response
    instance.interceptors.response.use(
      (res) => {
        let key = res.config.url + "&" + res.config.method;
        this.removePending(key); // 请求响应后，isRequest不传，默认为false，直接删除该pending，防止内存溢出
        if (res.status === 200) return Promise.resolve(res.data);
        else return Promise.reject(res);
      },
      (err) => {
        errorHandle(err);
        return Promise.reject(err);
      }
    );
  }
  removePending(key, isRequest = false) {
    // key存在
    if (this.pending[key]) {
      if (isRequest) this.pending[key]("取消重复的请求！");
      delete this.pending[key];
    }
  }
  // 创建实例
  request(options) {
    const instance = axios.create();
    const newOptions = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(newOptions);
  }
  // get
  get(url, config) {
    const options = Object.assign(
      {
        method: "get",
        url: url,
      },
      config
    );
    return this.request(options);
  }
  // post
  post(url, data) {
    return this.request({
      method: "post",
      url: url,
      data: data,
    });
  }
}

export default HttpRequest;
