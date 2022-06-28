<template>
  <q-expansion-item
    v-if="value.submenu"
    :label="value.label"
    :icon="icon"
    :default-opened="isOpen()"
  >
    <q-list class="q-pl-md">
      <VxMenu
        ref="menu"
        v-for="(m, index) in value.submenu"
        :value="m"
        :key="index"
      ></VxMenu>
    </q-list>
  </q-expansion-item>
  <q-list v-else class="menu-list">
    <q-item :to="value.link" v-ripple>
      <q-item-section avatar>
        <q-icon :name="icon" size="xs" />
      </q-item-section>
      <q-item-section>
        <q-item-label v-text="value.label"></q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped>
.menu-list .q-item {
  border-radius: 4px 32px 32px 4px;
}
.menu-list .q-router-link--exact-active {
  background: linear-gradient(
    118deg,
    var(--q-primary),
    rgba(115, 103, 240, 0.7)
  );
  color: #fff;
}
</style>

<script>
export default {
  props: {
    value: Object,
  },
  computed: {
    icon() {
      return this.value.icon ?? "fa fa-link";
    },
  },
  methods: {
    isOpenSubmenu(menu) {
      if (!menu.submenu) return false;

      let p = this.$route.path.split("/");
      if (p.length >= 2) {
        let module = p[1];
        if (menu.name == module) {
          return true;
        }
      }

      if (
        this.$route.path.substr(0, this.value.link.length) == this.value.link
      ) {
        return true;
      }

      for (let m of menu.submenu) {
        if (this.isOpenSubmenu(m)) return true;
      }
      return false;
    },
    isOpen() {
      if (!this.value.submenu) return false;
      return this.isOpenSubmenu(this.value);
    },
  },
};
</script>