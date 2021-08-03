<template>
  <div class="card file-manager-item folder">
    <div class="custom-control custom-checkbox">
      <input
        type="checkbox"
        class="custom-control-input"
        :id="`folder_${folder.path}`"
        v-model="checked"
      />
      <label
        class="custom-control-label"
        :for="`folder_${folder.path}`"
      ></label>
    </div>
    <div class="card-img-top file-logo-wrapper">
      <div class="dropdown float-right px-50">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i data-feather="more-vertical"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-edit-outline"
              command="rename"
              >{{$t('Rename')}}</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-delete" command="delete">{{
              $t("Delete")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        class="d-flex align-items-center justify-content-center w-100"
        @click="clickContent"
      >
        <i data-feather="folder"></i>
      </div>
    </div>
    <div class="card-body" @click="clickContent">
      <div class="content-wrapper">
        <p class="card-text file-name mb-0" v-text="folder.name"></p>
        <p class="card-text file-size mb-0" v-text="folder.size"></p>
        <p class="card-text file-date" v-text="folder.last_modified"></p>
      </div>
      <small
        class="file-accessed text-muted"
        v-text="`Last modify: ${folder.last_modified_human}`"
      ></small>
    </div>
  </div>
</template>
<script>
import feather from "feather-icons";
export default {
  props: {
    folder: Object,
  },
  data() {
    return {
      checked: false,
    };
  },
  mounted() {
    feather.replace({
      width: 14,
      height: 14,
    });
  },
  watch: {
    checked() {
      if (this.checked) {
        this.$emit("selected", this.folder.path);
      } else {
        this.$emit("unselected", this.folder.path);
      }
    },
  },
  methods: {
    clickContent() {
      this.$emit("input", this.folder.path);
    },
    handleCommand(command) {
      if (command == "delete") {
        this.$confirm(`Delete ${this.folder.name}?`).then(() => {
          this.$emit("delete", this.folder.path);
        });
      }

      if (command == "rename") {
        this.$prompt("Please input new folder name", {
          inputValue: this.folder.name,
        }).then(({ value }) => {
          this.$emit("rename", {
            path: this.folder.path,
            name: value,
          });
        });
      }
    },
  },
};
</script>
