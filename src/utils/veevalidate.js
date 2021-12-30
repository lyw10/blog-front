import { extend, localize } from "vee-validate";
import {
  required,
  email,
  min,
  max,
  length,
  confirmed,
  is_not,
} from "vee-validate/dist/rules";

import zh from "vee-validate/dist/locale/zh_CN.json";

extend("email", email);
extend("min", min);
extend("max", max);
extend("required", required);
extend("length", length);
extend("confirmed", confirmed);
extend("is_not", is_not);

localize("zh_CN", {
  messages: {
    ...zh.messages,
    required: "请输入{_field_}",
  },
  names: {
    email: "邮箱",
    password: "密码",
    name: "昵称",
    username: "账号",
    code: "验证码",
    catalog: "分类",
    title: "标题",
  },
  fields: {
    catalog: {
      is_not: "请选择{_field_}",
    },
    email: {
      email: "请输入正确的{_field_}",
      required: "请输入{_field_}!!!",
    },
  },
});
