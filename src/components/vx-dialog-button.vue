<template>
  <el-button @click="click" v-bind="$attrs">
    <slot></slot>
  </el-button>
</template>
<script>
import { Fancybox } from "@fancyapps/ui";

export default {
  props: {
    fancyboxType: {
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
      if (this.fancyboxType == "remote") {
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

      if (this.fancyboxType == "html") {
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