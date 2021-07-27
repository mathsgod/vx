<template>
  <div>
    <page-login-v1 v-if="version == 'v1'"></page-login-v1>
    <page-login-v2 v-if="version == 'v2'"></page-login-v2>
  </div>
</template>

<script>
import PageLoginV1 from "./page-login-v1";
import PageLoginV2 from "./page-login-v2";
export default {
  components: { PageLoginV1, PageLoginV2 },
  data() {
    return {
      version: "v1",
    };
  },
  beforeCreate() {
    if (this.$vx.logined) {
      this.$router.push("/Dashboard");
      return;
    }
    console.log(this.$vx.logined);
  },
  created() {
    this.version = this.$vx.config.login.version;
    this.logined = this.$vx.logined;
  },
};
</script>
