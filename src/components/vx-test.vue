<template>
  <div>
    abc

    <jspreadsheet :data="data" ref="jss"></jspreadsheet>

    <el-button @click="add">add</el-button>
    
  </div>
</template>
<script>
import "jspreadsheet-ce/src/jspreadsheet.css";
import "jsuites/dist/jsuites.css";
export default {
  data() {
    return {
      search: "",
      data: [
        ["US", "Apples", "Yes", "2019-02-12"],
        ["CA;US;UK", "Carrots", "Yes", "2019-03-01"],
        ["CA;BR", "Oranges", "No", "2018-11-10"],
        ["BR", "Coconuts", "Yes", "2019-01-12"],
      ],
    };
  },
  methods: {
    add() {
      this.$refs.jss.insertRow();

    },
    
  },
};
</script>
