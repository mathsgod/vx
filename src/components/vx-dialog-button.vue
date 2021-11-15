<template>
  <el-button @click="click" v-bind="$attrs">
    <slot></slot>
  </el-button>
</template>
<script>
import { Fancybox } from "@fancyapps/ui";
import { Dialog } from "element-ui";

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
      console.log(Dialog);
      if (this.fancyboxType == "remote") {
        if (this.src) {
          new Fancybox([
            {
              src: `<vue><vx-div remote="${this.src}" style="minWidth:80%></vx-div></vue>`,
              type: "html",
            },
          ]);
        }
        return;
      }

      

      if (this.fancyboxType == "html") {
        Fancybox.show(
          [
            {
              src: this.src,
              type: "html",
            },
          ],
          {
            mainClass: "mainClass",
          }
        );
        return;
      }
    },
  },
};
</script>