<script setup>
const COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-positive",
  "bg-negative",
  "bg-info",
  "bg-warning",
  "bg-dark",
];
</script>
<template>
  <q-list>
    <q-item-label header>
      <q-item-label>Theme Customizer</q-item-label>
      <q-item-label caption>Customize &amp; Preview in Real Time</q-item-label>
    </q-item-label>
    <q-separator></q-separator>
    <q-item>
      <q-item-section>
        <q-item-label>Skin</q-item-label>
        <div class="q-gutter-sm">
          <q-radio v-model="theme" val="light" label="Light" />
          <q-radio v-model="theme" val="dark" label="Dark" />
        </div>
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
    <q-item>
      <q-item-section>
        <q-item-label>Header color</q-item-label>

        <div class="row">
          <div v-for="c in COLORS" :key="c" :class="c" class="color-box" @click="headerColor = c"></div>
        </div>
      </q-item-section>
    </q-item>

    <q-separator></q-separator>
    <q-item>
      <q-item-section>
        <q-item-label>Mini mode</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-toggle v-model="miniState" />
      </q-item-section>
    </q-item>
    <q-separator></q-separator>
  </q-list>
</template>
<style scoped>
.color-box {
  width: 24px;
  height: 24px;
  margin: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: "light",
    },
    miniState: {
      type: Boolean,
      default: false,
    },
    headerColor: {
      type: String,
      default: "bg-primary",
    },
  },
  watch: {
    theme(val) {
      this.$emit("update:theme", val);
    },
    miniState(val) {
      this.$emit("update:miniState", val);
    },
    headerColor(val) {
      this.$emit("update:headerColor", val);
    },
  },
};
</script>