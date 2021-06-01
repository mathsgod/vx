<template>
  <li :class="{ 'has-sub': value.submenu }">
    <template v-if="value.submenu">
      <a class="d-flex align-items-center" href="javascript:void(0)"
        ><i :class="icon"></i
        ><span class="menu-title text-truncate">{{ value.label }}</span></a
      >
      <ul class="menu-content">
        <nav-item
          v-for="(m, index) in value.submenu"
          :key="index"
          :value="m"
        ></nav-item>
      </ul>
    </template>
    <template v-else>
      <a
        class="d-flex align-items-center"
        :href="value.link"
        @click.prevent="clickLink"
        ><i :class="icon"></i
        ><span class="menu-item">{{ value.label }}</span></a
      >
    </template>
  </li>
</template>
<script>
export default {
  name: "nav-item",
  props: {
    value: Object,
  },
  created() {
    //console.log(this.value);
  },
  computed: {
    icon() {
      return this.value.icon ?? "fa fa-link";
    },
  },
  watch: {
    $route(to) {
      console.log(to)
    },
  },
  methods: {
    clickLink() {
      this.$router.push("/" + this.value.link);
    },
  },
};
</script>