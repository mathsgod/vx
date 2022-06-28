<script setup>
import VxApp from './layouts/default.vue';

import { getCurrentInstance } from '@';

let vx = getCurrentInstance();
vx.init();

</script>

<template>
  <VxApp></VxApp>
</template>

<script>
</script>