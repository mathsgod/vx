<template>
  <div>
    <vx-login-v1 v-if="version == 'v1'"></vx-login-v1>
    <vx-login-v2 v-if="version == 'v2'"></vx-login-v2>
  </div>
</template>

<script>
import vxLoginV1 from "./vx-login-v1";
import vxLoginV2 from "./vx-login-v2";
export default {
  components: { vxLoginV1, vxLoginV2 },
  data() {
    return {
      version: "v1",
    };
  },
  beforeCreate(){
    console.log(this.$vx.logined);
  },
  created() {
    this.version = this.$vx.config.login.version;
    this.logined = this.$vx.logined;
  },
};
</script>

