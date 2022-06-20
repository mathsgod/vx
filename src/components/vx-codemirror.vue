<template>
  <div>
    <textarea ref="t1" v-model="localValue"></textarea>
  </div>
</template>
<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/addon/edit/closetag.js";
import prettify from "html-prettify";
export default {
  name: "vx-codemirror",
  props: {
    value: String,
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  watch: {
    localValue() {

      this.$emit("input", this.localValue);
    },
  },
  mounted() {
    this.localValue = prettify(this.localValue);
    
    this.$nextTick(() => {
      let editor = CodeMirror.fromTextArea(this.$refs.t1, {
        lineNumbers: true,
        mode: "htmlmixed",
        autoCloseTags: true,
      });

      editor.on("change", (instance) => {
        this.localValue = instance.getValue();



      });
    });
  },
};
</script>
