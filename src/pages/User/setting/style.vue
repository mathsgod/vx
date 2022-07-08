<template>
  <el-card :header="$t('Style')">
    <el-form label-width="auto">
      <el-divider>Form</el-divider>
      <el-form-item label="Size">
        <el-select v-model="form.form_size" clearable>
          <el-option value="large" label="large"></el-option>
          <el-option value="medium" label="medium"></el-option>
          <el-option value="small" label="small"></el-option>
          <el-option value="mini" label="mini"></el-option>
        </el-select>
      </el-form-item>

      <el-divider>Button</el-divider>
      <el-form-item label="Size">
        <el-select v-model="form.button_size" clearable>
          <el-option value="large" label="large"></el-option>
          <el-option value="medium " label="medium"></el-option>
          <el-option value="small" label="small"></el-option>
          <el-option value="mini" label="mini"></el-option>
        </el-select>
      </el-form-item>

      <el-divider>Table</el-divider>
      <el-form-item label="Size">
        <el-select v-model="form.table_size" clearable>
          <el-option value="large" label="large"></el-option>
          <el-option value="medium " label="medium"></el-option>
          <el-option value="small" label="small"></el-option>
          <el-option value="mini" label="mini"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Border">
        <el-switch v-model="form.table_border"></el-switch>
      </el-form-item>

      <el-divider>Description</el-divider>

      <el-form-item label="Size">
        <el-select v-model="form.description_size" clearable>
          <el-option value="large" label="large"></el-option>
          <el-option value="medium " label="medium"></el-option>
          <el-option value="small" label="small"></el-option>
          <el-option value="mini" label="mini"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Border">
        <el-switch v-model="form.description_border"></el-switch>
      </el-form-item>

      <div>
        <el-button type="primary" @click="save" v-text="$t('Save changes')"></el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  async created() {
    let { data } = await this.$vx.get("style");
    this.form = data;
  },
  methods: {
    async save() {
      let { status } = await vx.post("style", this.form);

      if (status == 204) {
        this.$message.success("Successfully updated");
      }
    },
  },
};
</script>
