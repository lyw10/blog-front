// 封装axios请求
// 对错误统一处理

import axios from "axios";
import errorHandle from "./errorHandle";

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
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
      (res) => {
        return res;
      },
      (err) => {
        errorHandle(err);
        return Promise.reject(err);
      }
    );

    // response
    instance.interceptors.response.use(
      (res) => {
        if (res.status === 200) return Promise.resolve(res.data);
        else return Promise.reject(res);
      },
      (err) => {
        errorHandle(err);
        return Promise.reject(err);
      }
    );
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
