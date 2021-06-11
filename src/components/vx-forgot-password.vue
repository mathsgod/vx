<template>
  <div>
    <vx-forgot-password-v1 v-if="version == 'v1'"></vx-forgot-password-v1>
    <vx-forgot-password-v2 v-if="version == 'v2'"></vx-forgot-password-v2>
  </div>
</template>


<script>
import VxForgotPasswordV1 from "./vx-forgot-password-v1";
import VxForgotPasswordV2 from "./vx-forgot-password-v2";
export default {
  components: { VxForgotPasswordV1, VxForgotPasswordV2 },
  data() {
    return {
      version: "v1",
    };
  },
  created() {
    this.version = this.$vx.config.login.version;

    this.logined = this.$vx.logined;
  },
};
</script>