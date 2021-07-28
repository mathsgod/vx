<script>
export default {
  props: {
    value: [String, Number],
    pills: Boolean,
  },
  render(h) {
    const that = this;
    this.$slots.default.forEach((n) => {
      if (!n.componentOptions) return;

      n.componentOptions.listeners = {
        selected(index) {
          that.$emit("input", index);
        },
      };

      const active = n.componentOptions.propsData.index == this.value;

      this.$nextTick(() => {
        n.componentInstance.active = active;
      });
    });

    return h(
      "ul",
      {
        class: {
          nav: true,
          "nav-pills": this.pills,
        },
      },
      this.$slots.default
    );
  },
};
</script>
