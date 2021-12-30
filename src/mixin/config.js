import config from "@/config/index";
import moment from "moment";
import "moment/locale/zh-cn";

export default {
  computed: {
    baseUrl() {
      return config.baseUrl;
    },
  },
  filters: {
    moment(date) {
      // 超过7天，显示日期
      if (moment(date).isBefore(moment().subtract(7, "days"))) {
        return moment(date).format("YYYY-MM-DD");
      } else {
        // 1小时前，xx小时前
        return moment(date).from(moment());
      }
    },
  },
};
