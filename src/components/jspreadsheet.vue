<script>
import jspreadsheet from "jspreadsheet-ce";

export default {
  props: {
    value: Array,
    minDimensions: Array,
  },
  data() {
    return {
      instance: null,
    };
  },
  render(h) {
    let options = Object.assign(this.$attrs, this.$props);

    if (this.value) {
      options.data = this.value;
    }

    let el = h("div");
    this.$nextTick(() => {
      if (!this.instance) {
        this.instance = jspreadsheet(el.elm, options);
        Object.assign(this, this.instance);
      } else {
        this.instance.setData(options.data);
      }
    });

    return h("el-scrollbar", {}, [el]);
  },
};
</script>