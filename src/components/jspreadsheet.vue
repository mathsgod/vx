<template>
  <div></div>
</template>

<script>
import jspreadsheet from "jspreadsheet-ce";

export default {
  props: {
    minDimensions: Array,
  },
  mounted() {
    let options = Object.assign(this.$attrs, this.$props);
    Object.assign(this, jspreadsheet(this.$el, options));
  },
};
</script>