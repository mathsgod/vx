<template>
  <q-item-label header>Labels</q-item-label>
  <q-item
    clickable
    @click="toggleLabel('document')"
    :active="label == 'document'"
  >
    <q-item-section avatar>
      <q-icon name="o_article" />
    </q-item-section>
    <q-item-section> Documents </q-item-section>
  </q-item>
  <q-item clickable @click="toggleLabel('image')" :active="label == 'image'">
    <q-item-section avatar>
      <q-icon name="o_insert_photo" />
    </q-item-section>
    <q-item-section> Image </q-item-section>
  </q-item>
  <q-item clickable @click="toggleLabel('video')" :active="label == 'video'">
    <q-item-section avatar>
      <q-icon name="o_videocam" />
    </q-item-section>
    <q-item-section> Video </q-item-section>
  </q-item>
  <q-item clickable @click="toggleLabel('audio')" :active="label == 'audio'">
    <q-item-section avatar>
      <q-icon name="o_audiotrack" />
    </q-item-section>
    <q-item-section> Audio </q-item-section>
  </q-item>
  <q-item
    clickable
    @click="toggleLabel('archive')"
    :active="value == 'archive'"
  >
    <q-item-section avatar>
      <q-icon name="o_text_snippet" />
    </q-item-section>
    <q-item-section> Archives </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: {
    label: String,
  },
  methods: {
    toggleLabel(type) {
      if (this.label == type) {
        this.$emit("update:label", null);
      } else {
        this.$emit("update:label", type);
      }
    },
  },
};
</script>
