<template>
  <el-button @click="click">
    <slot></slot>
  </el-button>
</template>
<script>
import { Fancybox } from "@fancyapps/ui";

export default {
  props: {
    type: {
      type: String,
      default: "html",
    },
    src: {
      type: String,
      default: "html",
    },
  },
  methods: {
    click() {
      if (this.type == "remote") {
        if (this.src) {
          new Fancybox([
            {
              src: `<vue><vx-div remote="${this.src}"></vx-div></vue>`,
              type: "html",
            },
          ]);
        }
        return;
      }

      if (this.type == "html") {
        new Fancybox([
          {
            src: this.src,
            type: "html",
          },
        ]);
        return;
      }
    },
  },
};
</script>