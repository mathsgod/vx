<template>
  <div>
    abc

    <jspreadsheet
      ref="jss"
      :minDimensions="[5, 10]"
      :columns="columns"
    ></jspreadsheet>

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
      columns: [
        {
          type: "text",
          title: "Number",
          width: 100,
        },
        {
          type: "text",
          title: "Name",
          width: 500,
        },
        {
          type: "text",
          title: "Width",
          width: 100,
        },
        {
          type: "text",
          title: "Depth",
          width: 100,
        },
        {
          type: "text",
          title: "Height",
          width: 100,
        },
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
