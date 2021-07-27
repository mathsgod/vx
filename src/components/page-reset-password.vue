<template>
  <div>
    <page-reset-password-v1 v-if="version == 'v1'"></page-reset-password-v1>
    <page-reset-password-v2 v-if="version == 'v2'"></page-reset-password-v2>
  </div>
</template>

<script>
import PageResetPasswordV1 from "./page-reset-password-v1";
import PageResetPasswordV2 from "./page-reset-password-v2";
export default {
  components: { PageResetPasswordV1, PageResetPasswordV2 },
  data() {
    return {
      version: "v1",
    };
  },
  created() {
    this.version = this.$vx.config.login.version;
  },
};
</script>
