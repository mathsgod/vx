<template>
  <div>
    <page-forgot-password-v1 v-if="version == 'v1'"></page-forgot-password-v1>
    <page-forgot-password-v2 v-if="version == 'v2'"></page-forgot-password-v2>
  </div>
</template>

<script>
import PageForgotPasswordV1 from "./page-forgot-password-v1";
import PageForgotPasswordV2 from "./page-forgot-password-v2";
export default {
  components: { PageForgotPasswordV1, PageForgotPasswordV2 },
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
