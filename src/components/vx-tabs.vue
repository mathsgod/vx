<template>
  <div>
    <ul class="nav" :class="getClass()" role="tablist">
      <slot></slot>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active" role="tabpanel" ref="content"></div>
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
    return {};
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
      let resp = (await this.$vx.get(link)).data;

      if (resp.error) {
        this.$message.error(resp.error.message);

        return;
      }

      window.$(this.$refs.content).html(resp);
    },
    getClass() {
      return ["nav-" + this.type];
    },
  },
};
</script>