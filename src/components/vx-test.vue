<template>
  <div>
    <el-card>
      <el-descriptions title="User Info">
        <el-descriptions-item label="Username"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
          Province</el-descriptions-item
        >
      </el-descriptions>
    </el-card>

    <vx-div :remote="remote"></vx-div>
    <el-button @click="click1">load</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      remote: "/System/test",
    };
  },
  methods: {
    click1() {
      this.remote = "/System/test?a=1";
    },
  },
};
</script>
