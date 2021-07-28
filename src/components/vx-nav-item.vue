<template>
  <li class="nav-item">
    <a
      class="nav-link"
      @click.prevent="$emit('selected', index)"
      :class="{ active: active }"
    >
      <i v-if="icon" class="mr-1" :class="icon"></i>
      <span class="font-weight-bold"><slot></slot></span>
    </a>
  </li>
</template>
<script>
export default {
  props: {
    index: [String, Number],
    icon: String,
  },
  data() {
    return {
      active: Boolean,
    };
  },
};
</script>
