<template>
  <div>
    abc

    <jspreadsheet
      ref="jss"
      :min-dimensions="[5, 10]"
      :columns="columns"
      v-model="data"
    ></jspreadsheet>

    <el-button @click="add">add</el-button>
    <el-button @click="getData">get</el-button>
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
      data: [["1", "2", "3"]],
    };
  },
  methods: {
    add() {
      this.data = [["x", "y", "z"]];

      //this.$refs.jss.reload();
    },
    getData() {
      console.log(this.data);
    },
  },
};
</script>
