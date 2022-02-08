<template>
  <div>
    aa
    <vx-tinymce v-model="content"></vx-tinymce>

    <el-button @click="update">update</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "<p>Hello World!</p>",
    };
  },
  methods: {
    update() {
      this.content = "<p>ABC</p>";
    },

    
  },
};
</script>
