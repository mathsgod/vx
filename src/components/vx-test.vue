<template>
  <div>
    div
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
