<script setup>
import VxApp from './layouts/default.vue';
import Login from '@/components/Login.vue';
import { useRoute } from 'vue-router';
import { getCurrentInstance } from "@";
let vx = getCurrentInstance();
vx.setRoute(useRoute());
</script>

<template>
  <template v-if="ready">
    <div v-if="logined">
      <VxApp></VxApp>
    </div>
    <Login v-else></Login>
  </template>
  <div v-else>
    Loading...
  </div>
</template>
<script>
export default {
  data() {
    return {
      ready: false,
      logined: false
    }
  },
  async mounted() {
    await this.$vx.init();
    this.logined = this.$vx.logined;
    this.ready = true;



  }
}

</script>
