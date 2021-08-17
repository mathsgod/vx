<template>
  <vx-card v-loading="loading">
    <vx-card-body>
      <el-form
        :model="form"
        label-width="auto"
        ref="form1"
        class="vx-form"
        :size="size"
      >
        <slot v-bind:form="form"></slot>
      </el-form>
    </vx-card-body>

    <vx-card-footer>
      <el-button @click="onSubmit()" icon="el-icon-check" type="primary">{{
        $t("Submit")
      }}</el-button>
      <el-button @click="onBack">{{ $t("Back") }}</el-button>
    </vx-card-footer>
  </vx-card>
</template>
<script>
export default {
  props: {
    action: String,
    size: String,
    method: {
      type: String,
      default: "post",
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      form: this.data,
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          let action = this.$route.path;
          if (this.action) {
            action = this.action;
          }

          let resp;
          this.loading = true;

          if (this.$el.querySelectorAll("input.el-upload__input").length > 0) {
            let formData = new FormData();

            this.$el
              .querySelectorAll("input.el-upload__input")
              .forEach((input) => {
                if (input.multiple) {
                  input.files.forEach((file) => {
                    formData.append(input.name + "[]", file);
                  });
                } else {
                  input.files.forEach((file) => {
                    formData.append(input.name, file);
                  });
                }
              });

            formData.append(
              "vx",
              new Blob([JSON.stringify(this.form)], {
                type: "application/json",
              })
            );

            resp = await this.$vx.post(action, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          } else {
            if (this.method == "post") {
              resp = await this.$vx.post(action, this.form);
            } else if (this.method == "patch") {
              resp = await this.$vx.patch(action, this.form);
            }
          }

          this.loading = false;

          if (resp.status == 204) {
            this.$message.success("Updated");
            if (resp.headers.location) {
              this.$router.push(resp.headers.location);
            }
            return;
          }

          if (resp.status == 201) {
            this.$message.success(resp.statusText);

            if (resp.headers.location) {
              this.$router.push(resp.headers.location);
            }

            return;
          }

          if (resp.status == 200) {
            if (resp.data.error) {
              this.$alert(resp.data.error.message, { type: "error" });
              return;
            }

            for (let action of resp.data) {
              switch (action.type) {
                case "message":
                  this.$message(action.body);
                  break;

                case "notify":
                  this.$notify(action.body);
                  break;

                case "redirect":
                  this.$router.push(action.body);
                  break;
              }
            }
          }
        }
      });
    },
    onBack() {
      window.history.go(-1);
    },
  },
};
</script>
