<template>
  <div>
    <ul class="nav" :class="getClass()" role="tablist">
      <slot></slot>
    </ul>
    <div class="tab-content">
      <div
        class="tab-pane active"
        role="tabpanel"
        ref="content"
        v-loading="loading"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "tabs",
    },
  },
  data() {
    return {
      loading: false,
    };
  },

  async mounted() {
    let tabs = [];
    this.$slots.default.forEach((vnode) => {
      if (vnode.tag == undefined) return;
      tabs.push(vnode.componentInstance);
    });

    let link;
    for (let tab of tabs) {
      tab.$on("selected", (e) => {
        this.loadContent(e);
      });

      if (tab.active) {
        link = tab.link;
      }
    }
    if (link) {
      await this.loadContent(link);
    }
  },
  methods: {
    async loadContent(url) {
      let link;
      if (url[0] != "/") {
        link = this.$route.path + "/" + url;
      } else {
        link = url;
      }
      this.loading = true;

      try {
        let { data } = await this.$vx.get(link);
        this.loading = false;

        if (data.error) {
          this.$message.error(data.error.message);

          return;
        }

        window.$(this.$refs.content).html(data);
      } catch (e) {
        this.loading = false;
        this.$alert(e, { type: "error" });
        return;
      }
    },
    getClass() {
      return ["nav-" + this.type];
    },
  },
};
</script>