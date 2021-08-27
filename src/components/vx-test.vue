<template>
  <div>
    <div>
      <el-button @click="onPreview">Preview</el-button>
      <el-image-viewer
        v-if="showViewer"
        :on-close="closeViewer"
        :url-list="[url]"
      />
    </div>

    <el-divider></el-divider>

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
export default {
  data() {
    return {
      showViewer: false, // 显示查看器
      url: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
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
    onPreview() {
      this.showViewer = true;
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false;
    },
  },
};
</script>
