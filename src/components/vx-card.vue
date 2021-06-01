<script>
export default {
  render(h) {
    //check has vx-card-body

    let body = this.$slots.default.filter((node) => {
      if (node.componentOptions) {
        return node.componentOptions.tag == "vx-card-body";
      }
    });

    let content = [];
    if (body.length == 0) {
      content.push(h("vx-card-body", this.$slots.default));
    } else {
      content = this.$slots.default;
    }

    return h(
      "div",
      {
        class: {
          card: true,
        },
      },
      content
    );
  },
};
</script>