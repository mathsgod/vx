<template>
  <el-card :header="$t('Biometric authentication')">
    <el-switch v-model="on_off" :active-text="$t('Activate biometric authentication on this device')"
      @change="changeActivate"></el-switch>
    <el-divider></el-divider>
    <el-button @click="register" icon="el-icon-plus">Register</el-button>

    <el-table :data="items" size="mini">
      <el-table-column width="100" v-slot="scope">
        <el-button icon="el-icon-delete" @click="onDelete(scope.row)" type="danger" size="mini"></el-button>
      </el-table-column>
      <el-table-column :label="$t('Time')" prop="time" sortable></el-table-column>
      <el-table-column label="IP" prop="ip"></el-table-column>
      <el-table-column label="User agent" prop="user-agent"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      on_off: false,
    };
  },
  created() {
    this.reload();
    if (localStorage.getItem("auth_username") == this.$vx.me.username) {
      this.on_off = true;
    }
  },
  methods: {
    changeActivate(value) {
      if (value) {
        localStorage.setItem("auth_username", this.$vx.me.username);
      } else {
        localStorage.removeItem("auth_username");
      }
    },
    async onDelete(item) {
      await this.$confirm(this.$t("Delete this record?"), {
        type: "warning",
      });
      await this.$vx.delete(`bio-auth?uuid=${item.uuid}`);
      await this.reload();
    },
    async register() {

      await this.$vx.authRegister();

      await this.$message("Register success", {
        type: "success",
      });
      await this.reload();

      localStorage.setItem("auth_username", this.$vx.me.username);
      this.on_off = true;
    },
    async reload() {
      let { data } = await this.$vx.get("bio-auth");
      this.items = data;
    },
  },
};
</script>
