<template>
  <div>
    <el-input @focus="focusInput" v-model="localData" clearable></el-input>

    <template v-if="dialogVisible">
      <el-dialog
        :visible.sync="dialogVisible"
        width="80%"
        title="File manager"
        top="2vh"
      >
        <vx-file-manager
          @input="fileSelected($event)"
          default-action="select"
          :base="base"
          :multiple="multiple"
          :preview="preview"
        ></vx-file-manager>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import vxFileManager from "./vx-file-manager.vue";
export default {
  components: { vxFileManager },
  props: {
    value: String,
    base: String,
    multiple: Boolean,
    preview: Boolean,
  },
  data() {
    return {
      localData: this.value,
      dialogVisible: false,
    };
  },
  watch: {
    localData() {
      this.$emit("input", this.localData);
    },
  },
  methods: {
    focusInput() {
      this.dialogVisible = true;
    },
    fileSelected(path) {
      this.$emit("input", path);
      this.dialogVisible = false;
      this.localData = path;
    },
  },
};
</script>
