<template>
  <div class="list-group list-group-labels">
    <h6 class="section-label px-2 mb-1">Labels</h6>
    <a
      v-if="fileType == null"
      @click="toggleLabel('document')"
      href="javascript:void(0)"
      class="list-group-item list-group-item-action"
      :class="{ active: value == 'document' }"
    >
      <i data-feather="file-text" class="mr-50 font-medium-3"></i>
      <span class="align-middle" v-t="'Documents'"></span>
    </a>
    <a
      v-if="fileType == null || fileType == 'image'"
      @click="toggleLabel('image')"
      href="javascript:void(0)"
      class="list-group-item list-group-item-action"
      :class="{ active: value == 'image' }"
    >
      <i data-feather="image" class="mr-50 font-medium-3"></i>
      <span class="align-middle" v-t="'Images'"></span>
    </a>
    <a
      v-if="fileType == null"
      @click="toggleLabel('video')"
      href="javascript:void(0)"
      class="list-group-item list-group-item-action"
      :class="{ active: value == 'video' }"
    >
      <i data-feather="video" class="mr-50 font-medium-3"></i>
      <span class="align-middle" v-t="'Videos'"></span>
    </a>
    <a
      v-if="fileType == null"
      @click="toggleLabel('audio')"
      href="javascript:void(0)"
      class="list-group-item list-group-item-action"
      :class="{ active: value == 'audio' }"
    >
      <i data-feather="music" class="mr-50 font-medium-3"></i>
      <span class="align-middle" v-t="'Audio'"></span>
    </a>
    <a
      v-if="fileType == null"
      @click="toggleLabel('archive')"
      href="javascript:void(0)"
      class="list-group-item list-group-item-action"
      :class="{ active: value == 'archive' }"
    >
      <i data-feather="layers" class="mr-50 font-medium-3"></i>
      <span class="align-middle">Archives</span>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    fileType: String,
    value: String,
  },
  methods: {
    toggleLabel(type) {
      if (this.value == type) {
        this.$emit("input", null);
      } else {
        this.$emit("input", type);
      }
    },
  },
};
</script>
