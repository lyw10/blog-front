import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";
import jwt from "jsonwebtoken";
import moment from "dayjs";

const Login = () => import("../views/Login.vue");
const Reg = () => import("../views/Reg.vue");
const Forget = () => import("../views/Forget.vue");
const Index = () => import("../views/channels/Index.vue");
const Template1 = () => import("../views/channels/Template1.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "",
        name: "index",
        component: Index,
      },
      {
        path: "/index/:catalog",
        name: "catalog",
        component: Template1,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/reg",
    name: "reg",
    component: Reg,
    beforeEnter: (to, from, next) => {
      if (from.name === "login") {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/forget",
    name: "forget",
    component: Forget,
  },
  {
    path: "/confirm",
    name: "confirm",
    component: () => import("../views/Confirm.vue"),
  },
  {
    path: "/reset",
    name: "reset",
    component: () => import("../views/Reset.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User.vue"),
  },
  {
    path: "/center",
    component: () => import("../views/Center.vue"),
    meta: { requireAuth: true },
    linkActiveClass: "layui-this",
    children: [
      {
        path: "",
        name: "center",
        component: () => import("../components/user/Center.vue"),
      },
      {
        path: "msg",
        name: "user-msg",
        component: () => import("../components/user/Msg.vue"),
      },
      {
        path: "other",
        name: "user-other",
        component: () => import("../components/user/Other.vue"),
      },
      {
        path: "posts",
        component: () => import("../components/user/Posts.vue"),
        children: [
          {
            path: "",
            name: "mypost",
            component: () => import("../components/user/common/MyPost.vue"),
          },
          {
            path: "mycollection",
            name: "mycollections",
            component: () =>
              import("../components/user/common/MyCollections.vue"),
          },
        ],
      },
      {
        path: "settings",
        component: () => import("../components/user/Settings.vue"),
        children: [
          {
            path: "",
            name: "info",
            component: () => import("../components/user/common/Myinfo.vue"),
          },
          {
            path: "pic",
            name: "pic",
            component: () => import("../components/user/common/PicUpload.vue"),
          },
          {
            path: "password",
            name: "password",
            component: () => import("../components/user/common/Password.vue"),
          },
          {
            path: "accounts",
            name: "accounts",
            component: () => import("../components/user/common/Accounts.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  linkExactActiveClass: "layui-this",
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (token) {
    // 验证token时效性，8-24h，refresh token 1个月：拿refresh token去请求新的token
    const payload = jwt.decode(token);
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 当前时间 < 过期时间 => token有效
      store.commit("setToken", token);
      store.commit("setUserInfo", userInfo);
      store.commit("setIsLogin", true);
    } else {
      localStorage.clear();
    }
  }
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const isLogin = store.state.isLogin;
    if (isLogin) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
