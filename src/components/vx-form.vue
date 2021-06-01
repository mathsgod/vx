<template>
  <vx-card>
    <vx-card-body>
      <el-form :model="form" label-width="auto" ref="form1">
        <slot v-bind:form="form"></slot>
      </el-form>
    </vx-card-body>

    <vx-card-footer>
      <el-button @click="onSubmit()" icon="el-icon-check" type="success"
        >Submit</el-button
      >
    </vx-card-footer>
  </vx-card>
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
          let action = this.$route.path;
          if (this.action) {
            action = this.action;
          }
          let resp = await this.$vx.post(action, this.form);
          
          console.log(resp);
          
        }
      });
    },
    onBack() {
      window.history.go(-1);
    },
  },
};
</script>