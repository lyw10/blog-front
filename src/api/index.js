import axios from "axios";
import config from "../config";

axios.defaults.baseURL = config.baseUrl;
// process.env.NODE_ENV !== "production"
//   ? "http://localhost:3000"
//   : "http://your.domain.com";
