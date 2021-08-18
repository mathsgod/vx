<template>
  <div>
    <el-tooltip effect="dark" :content="title" placement="top">
      <div class="avatar pull-up">
        <template v-if="!image">
          <div class="avatar-content" v-text="shortFormTitle"></div>
        </template>
        <template v-else>
          <el-image :src="image" style="width: 30px"></el-image>
        </template>
      </div>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    image: String,
  },
  computed: {
    shortFormTitle() {
      let c = "";
      this.title
        .toUpperCase()
        .split(" ")
        .forEach((w) => {
          c += w.charAt(0);
        });
      return c;
    },
  },
};
</script>