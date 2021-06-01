<template>
  <div class="card-header">
    <h4 v-if="title" v-text="title"></h4>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>