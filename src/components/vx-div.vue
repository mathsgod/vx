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
        this.$emit("loading");
        let { data, status } = await this.$vx.get(this.remote);
        this.loading = false;

        if (status != 200) {
          this.$alert(data.error.message, { type: "error" });
          return;
        }
        window.$(this.$el).html(data);
        this.$emit("loaded");
      } else {
        console.warn("vx-div: remote not set");
      }
    },
  },
};
</script>