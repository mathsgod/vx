<template>
  <el-form :model="form" label-width="auto" ref="form1">
    <slot v-bind:form="form"></slot>

    <el-form-item>
      <el-button @click="onSubmit()" icon="el-icon-check" type="success"
        >Submit</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    action: String,
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      form: this.data,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          await this.$app.post(this.action, this.form);
        }
      });
    },
    onBack() {
      window.history.go(-1);
    },
  },
};
</script>