
<template>
  <el-card>
    <div class="mb-1">
      <el-switch v-model="on_off" active-text="2 step verification">
      </el-switch>
    </div>

    <div v-if="on_off && !show_setting">
      <p>Your IP address : <span v-text="ip_address"></span></p>
      <el-button @click="addToWhitelist" type="primary">Add IP to white list</el-button>

      <el-table :data="whitelist">
        <el-table-column v-slot="scope" width="50">
          <el-link @click.prevent="removeWhitelist(scope.row.value)" icon="el-icon-delete" />
        </el-table-column>
        <el-table-column label="IP address" prop="value"></el-table-column>
      </el-table>
    </div>

    <div v-if="show_setting">
      <p>
        Now download the app and scan the qrcode. Input the code to the
        following input and submit
      </p>
      <p>
        For Android user, install
        <el-link type="primary" target="_blank"
          href="https://play.google.com/store/apps/details?id=com.azure.authenticator">Authenticator</el-link>
      </p>

      <p>
        For iOS user, install
        <el-link type="primary" target="_blank"
          href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458">Authenticator</el-link>
      </p>

      <el-image :src="qr_code"></el-image>

      <el-form>
        <el-form-item label="Code">
          <el-input v-model="code" placeholder="6 digits code" minlength="6" maxlength="6" />
        </el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      whitelist: [],
      has_two_step: false,
      qr_code: null,
      code: null,
      secret: null,
      on_off: false,
      ip_address: "",
    };
  },
  async created() {
    let { data } = await this.$vx.get("2fa");
    this.has_two_step = data.has_two_step;
    this.on_off = data.has_two_step;
    this.whitelist = data.whitelist;
    this.ip_address = data.ip_address;
  },
  computed: {
    show_setting() {
      if (this.on_off && !this.has_two_step) {
        return true;
      }
      return false;
    },
  },
  watch: {
    async on_off() {
      //get this qrcode
      if (!this.on_off) {
        //turn it off

        if (this.has_two_step) {
          try {
            await this.$confirm(
              "Remove 2 step verification? You need to do setup process if you enable at next time."
            );

            //do remove
            this.$vx.delete("2fa");
            this.has_two_step = false;
          } catch {
            this.on_off = true;
          }
        }

        return;
      } else {
        let { data } = await this.$vx.get("2fa?_entry=qrcode");

        this.qr_code = data.image;
        this.secret = data.secret;
      }
    },
  },
  methods: {
    async removeWhitelist(value) {
      await this.$confirm("Remove white list?", { type: "warning" });
      await this.$vx.post("2fa?_entry=removeWhitelist", {
        ip: value,
      });
      await this.loadWhitelist();
    },
    async addToWhitelist() {
      await this.$vx.post("2fa?_entry=addWhitelist");
      await this.loadWhitelist();
    },
    async loadWhitelist() {
      let { data } = await this.$vx.get("2fa");
      this.whitelist = data.whitelist;
    },
    async onSubmit() {
      let resp = (
        await this.$vx.post("2fa", {
          code: this.code,
          secret: this.secret,
        })
      ).data;

      if (resp.error) {
        this.$message.error(resp.error.message);
        return;
      }

      this.$message.success("2 Step verification updated");

      this.has_two_step = true;

      this.code = null;
    },
  },
};
</script>