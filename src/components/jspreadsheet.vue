<template>
  <div></div>
</template>

<script>
import jspreadsheet from "jspreadsheet-ce";

export default {
  mounted() {
    Object.assign(this, jspreadsheet(this.$el, this.$attrs));
  },
};
</script>