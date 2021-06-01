<template>
  <el-table :data="data" class="table">
    <el-table-column width="70px">
      <template slot="header">
        <el-button
          type="primary"
          size="mini"
          @click="addRow()"
          icon="el-icon-plus"
        ></el-button>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-if="scope.row[dataKey]"
          type="danger"
          @click.prevent="removeRow(scope.$index, scope.row)"
          icon="el-icon-minus"
        ></el-button>
        <el-button
          v-else
          size="mini"
          type="warning"
          @click.prevent="removeRow(scope.$index)"
          icon="el-icon-minus"
        ></el-button>
        <input
          type="hidden"
          :name="`${dataName}[${scope.$index}][${dataKey}]`"
          :value="scope.row[dataKey]"
        />
      </template>
    </el-table-column>
    <slot></slot>

    <input
      type="hidden"
      v-for="(i, index) in deletedId"
      :key="index"
      :value="i"
      :name="`${dataName}[${data.length + index}][__del__]`"
    />
  </el-table>
</template>

<script>
export default {
  name: "vx-form-table",
  props: {
    data: Array,
    dataKey: String,
    dataName: {
      type: String,
      default: "data",
    },
  },
  data() {
    return {
      deletedId: [],
    };
  },
  methods: {
    removeRow(index, data) {
      if (data) {
        this.deletedId.push(data[this.dataKey]);
      }

      this.data.splice(index, 1);
    },
    addRow() {
      this.data.unshift({});
    },
  },
};
</script>