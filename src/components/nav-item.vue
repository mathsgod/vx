<template>
  <li :class="{ 'has-sub': value.submenu, active: isActive(), open: isOpen() }">
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
          ref="nav_item"
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
  data() {
    return {
      open: false,
      active: false,
    };
  },
  created() {
    this.active = this.$route.path == this.value.link;
  },
  mounted() {
    this.open = this.isOpen();
    this.$forceUpdate();
  },
  computed: {
    icon() {
      return this.value.icon ?? "fa fa-link";
    },
  },
  watch: {
    $route(to) {
      this.active = to.path == this.value.link;
      this.open = this.isOpen();
    },
  },
  methods: {
    isActive() {
      if (!this.value.submenu) {
        return this.$route.path == this.value.link;
      }
      return false;
    },
    isOpen() {
      if (this.$refs.nav_item) {
        if (
          this.$route.path.substr(0, this.value.link.length) == this.value.link
        ) {
          return true;
        }

        for (let n of this.$refs.nav_item) {
          if (n.isOpen()) {
            return true;
          }
          if (n.isActive()) {
            return true;
          }
        }
      }

      return false;
    },
    clickLink() {
      this.$router.push(this.value.link);
    },
  },
};
</script>