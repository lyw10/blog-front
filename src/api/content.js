import axios from "@/utils/request";
import qs from "qs";

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

export { getList, getTips, getLinks, getTop, uploadImg };
