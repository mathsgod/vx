<script setup>
import LoginPage from "@/components/Login.vue";
</script>
<template>
  <LoginPage></LoginPage>
</template>


<script>
export default {
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
  },
  created() {
    this.version = this.$vx.config.login.version;
    this.logined = this.$vx.logined;
  },
};
</script>