<template>
  <div>
    <jspreadsheet
      v-model="materials"
      :columns="columns"
      :min-dimensions="[3, 1]"
    ></jspreadsheet>

    <el-button @click="update">update</el-button>
  </div>
</template>
<script>
import jspreadsheet from "./jspreadsheet.vue";
export default {
  components: { jspreadsheet },
  data() {
    return {
      materials: [["1", "2", "3", "4"]],
      columns: [
        {
          type: "text",
          title: "ID",
          align: "left",
          width: 50,
          readOnly: true,
        },
        {
          type: "text",
          title: "Number",
          align: "left",
          width: 80,
        },
        {
          type: "text",
          title: "Name",
          align: "left",
          width: 700,
        },
        {
          type: "text",
          title: "Width",
          width: 80,
        },
        {
          type: "text",
          title: "Depth",
          width: 80,
        },
        {
          type: "text",
          title: "Height",
          width: 80,
        },
        {
          type: "text",
          title: "Count",
          width: 100,
        },
      ],
      content: "<p>Hello World!</p>",
    };
  },
  methods: {
    update() {
      console.log(this.materials);
    },
  },
};
</script>
