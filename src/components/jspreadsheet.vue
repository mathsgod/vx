<template>
  <div></div>
</template>

<script>
import jspreadsheet from "jspreadsheet-ce";

export default {
  props: {
    value: Array,
    minDimensions: Array,
  },
  mounted() {
    let options = Object.assign(this.$attrs, this.$props);

    if (this.value) {
      options.data = this.value;
    }

    options.onchange = () => {
      this.$emit("input", this.getJson());
    };

    const jss = jspreadsheet(this.$el, options);
    Object.assign(this, jss);
  },
};
</script>