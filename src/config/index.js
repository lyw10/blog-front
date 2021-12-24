export default {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "http://47.96.40.132:3001"
      : "http://localhost:3000",
  publicPath: [/^\/public/, /^\/login/],
};
