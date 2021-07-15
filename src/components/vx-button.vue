<script>
export default {
  props: {
    type: String,
    link: {
      type: String,
      default: "/",
    },
    size: {
      type: String,
      default: "mini",
    },
  },
  render(h) {
    if (this.type == "delete") {
      return h("el-button", {
        props: {
          size: this.size,
          icon: "el-icon-close",
          type: "danger",
        },
        on: {
          click: this.click,
        },
      });
    }

    if (this.type == "update") {
      return h(
        "router-link",
        {
          props: {
            to: this.link,
          },
        },
        [
          h("el-button", {
            props: {
              size: this.size,
              icon: "el-icon-edit",
              type: "warning",
            },
          }),
        ]
      );
    }

    if (this.type == "view") {
      return h(
        "router-link",
        {
          props: {
            to: this.link,
          },
        },
        [
          h("el-button", {
            props: {
              size: this.size,
              icon: "el-icon-search",
              type: "primary",
            },
          }),
        ]
      );
    }

    return h("el-button");
  },
  methods: {
    click() {
      this.$confirm("Are you sure?", { type: "warning" }).then(async () => {
        await this.$vx.delete(this.link);
        this.$emit("deleted");
      });
    },
  },
};
</script>
