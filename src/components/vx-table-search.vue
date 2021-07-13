<template>
  <el-form :inline="true" :model="form" @submit.native.prevent class="ml-2 mr-2">
    <slot v-bind:form="form"></slot>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {},
    };
  },
};
</script>
