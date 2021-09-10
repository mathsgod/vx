<template>
  <div><slot></slot></div>
</template>
<script>
export default {
  props: {
    remote: String,
    autoReload: {
      type: Boolean,
      default: true,
    },
  },
  async created() {
    this.reload();
  },
  watch: {
    remote() {
      if (this.autoReload) {
        this.reload();
      }
    },
  },
  methods: {
    async reload() {
      if (this.remote) {
        let { data } = await this.$vx.get(this.remote);
        window.$(this.$el).html(data);
      } else {
        console.warn("vx-div: remote not set");
      }
    },
  },
};
</script>