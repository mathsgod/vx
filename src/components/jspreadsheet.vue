<template>
  <div></div>
</template>

<script>
import jspreadsheet from "jspreadsheet-ce";

export default {
  mounted() {
    console.log(this.$attrs);
    Object.assign(this, jspreadsheet(this.$el, this.$attrs));
  },
};
</script>