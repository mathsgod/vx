<template>
  <div>
    <slot name="activator" v-bind="{ on: on }"></slot>
    <div v-if="dialogVisible">
      <el-dialog
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :title="title"
        append-to-body
        ><slot></slot
      ></el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "50%",
    },
  },
  data() {
    return {
      dialogWidth: this.width,
      dialogVisible: false,
      attrs: {},
      on: {},
    };
  },
  created() {
    this.on.click = this.click;
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.setDialogWidth();
      })();
    };
    this.setDialogWidth();
  },
  methods: {
    click() {
      this.dialogVisible = true;
    },
    setDialogWidth() {
      let windowSize = document.body.clientWidth;
      if (windowSize < 576) {
        this.dialogWidth = "100%";
      } else if (windowSize < 768) {
        this.dialogWidth = "90%";
      } else {
        this.dialogWidth = this.width;
      }
    },
  },
};
</script>