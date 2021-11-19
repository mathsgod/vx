<script>
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/src/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

export default {
  props: {
    value: Array,
  },
  data() {
    return {
      instance: null,
    };
  },
  render(h) {
    const snakeToCamel = (str) =>
      str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) =>
          group.toUpperCase().replace("-", "")
        );

    console.log(this.$attrs);

    let options = {};

    for (let attr of Object.entries(this.$attrs)) {
      options[snakeToCamel(attr[0])] = attr[1];
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