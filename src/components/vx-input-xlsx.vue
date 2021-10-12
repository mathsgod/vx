<template>
  <div>
    <template v-if="!hasFile">
      <input type="file" ref="input1" accept=".xlsx" @change="onChange" />
    </template>
    <template v-else>
      <div>
        {{ this.data.length }} records
        <el-button @click="onClear" size="mini">Clear</el-button>
      </div>
    </template>
  </div>
</template>
<script>
import readXlsxFile from "read-excel-file";
export default {
  data() {
    return {
      data: [],
      fileList: [],
      hasFile: false,
    };
  },

  methods: {
    async onChange() {
      this.hasFile = true;
      this.data = await readXlsxFile(this.$refs.input1.files[0]);

      this.$emit("input", this.data);
    },
    onClear() {
      this.hasFile = false;
      this.data = [];
      this.$emit("input", []);
    },
  },
};
</script>