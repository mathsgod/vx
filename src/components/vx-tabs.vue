<template>
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <slot></slot>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active" role="tabpanel" ref="content"></div>
    </div>
  </div>
</template>

<script>
export default {
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

      console.log(tab.active);

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
      let resp = await this.$app.get("/" + url);
      window.$(this.$refs.content).html(resp.data);
    },
  },
};
</script>