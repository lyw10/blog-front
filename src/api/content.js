import axios from "@/utils/request";
import qs from "qs";
import store from "@/store";

/**
 * 获取文章列表接口
 * @param {*} options
 */
const getList = (options) => {
  return axios.get("/public/list?" + qs.stringify(options));
};

// 获取侧边栏-温馨提醒接口
const getTips = () => {
  return axios.get("/public/tips");
};

// 获取侧边栏-友情链接接口
const getLinks = () => {
  return axios.get("/public/links");
};

// 获取侧边栏-本周热议接口
const getTop = () => {
  return axios.get("/public/topWeek");
};

// 图片上传接口
const uploadImg = (formData) => {
  return axios.post("/content/upload", formData);
};

// 发贴接口
const addPost = (data) => axios.post("/content/add", { ...data });

// 获取文章详情
const getDetail = (tid) => {
  const token = store.state.token;
  let headers = {};
  if (token !== "") {
    headers = {
      headers: {
        Authorization: "Bearer " + store.state.token,
      },
    };
  }
  return axios.get("/public/content/detail?tid=" + tid, headers);
};

export { getList, getTips, getLinks, getTop, uploadImg, addPost, getDetail };
