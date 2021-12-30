import { ValidationProvider, ValidationObserver } from "vee-validate";
import { getCode } from "@/api/login";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      code: "",
      svg: "",
    };
  },
  mounted() {
    let sid = "";
    if (localStorage.getItem("sid")) {
      sid = localStorage.getItem("sid");
    } else {
      sid = uuidv4();
      localStorage.setItem("sid", sid);
    }
    this.$store.commit("setSid", sid);
    this._getCode();
  },
  methods: {
    _getCode() {
      let sid = this.$store.state.sid;
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data;
        }
      });
    },
  },
};
