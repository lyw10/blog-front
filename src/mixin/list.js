import { getList } from "@/api/content";

export default {
  data() {
    return {
      isEnd: false,
      isTop: "0",
      current: "",
      status: "",
      tag: "",
      sort: "created",
      page: 0,
      limit: 10,
      catalog: "",
      lists: [],
    };
  },
  mounted() {
    let catalog = this.$route.params["catalog"];
    if (typeof catalog !== "undefined" && catalog !== "") {
      this.catalog = catalog;
    }
    this._getList();
  },
  methods: {
    init() {
      this.page = 0;
      this.lists = [];
      this.isEnd = false;
      this._getList();
    },
    _getList() {
      if (this.isEnd) return;
      let options = {
        catalog: this.catalog,
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status,
      };
      getList(options)
        .then((res) => {
          if (res.code === 200) {
            if (res.data.length < this.limit) this.isEnd = true;
            if (!this.lists.length) this.lists = res.data;
            else this.lists = this.lists.concat(res.data);
          }
        })
        .catch((err) => {
          this.$alert(err.message);
        });
    },
    nextPage() {
      this.page++;
      this._getList();
    },
  },
};
