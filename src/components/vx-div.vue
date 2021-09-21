<template>
  <div v-loading="loading"><slot></slot></div>
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
  data() {
    return {
      loading: false,
    };
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
        this.loading = true;
        try {
          let { data } = await this.$vx.get(this.remote);
          this.loading = false;
          window.$(this.$el).html(data);
        } catch (e) {
          this.loading = false;
        }
      } else {
        console.warn("vx-div: remote not set");
      }
    },
  },
};
</script>