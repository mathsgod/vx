<template>
  <div class="card file-manager-item file">
    <div class="custom-control custom-checkbox">
      <input
        type="checkbox"
        class="custom-control-input"
        :id="`file_${file.path}`"
        v-model="checked"
      />
      <label class="custom-control-label" :for="`file_${file.path}`"></label>
    </div>
    <div class="card-img-top file-logo-wrapper">
      <div class="dropdown float-right px-50">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i data-feather="more-vertical"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-download" command="download"
              >Download</el-dropdown-item
            >
            <el-dropdown-item
              icon="el-icon-view"
              command="preview"
              v-if="canPreview"
              >Preview</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-copy-document" command="duplicate"
              >Make a copy</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-edit-outline" command="rename"
              >Rename</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-info" command="info"
              >Info</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-delete" command="delete"
              >Delete</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="d-flex align-items-center justify-content-center w-100">
        <i :class="getIcon(file.extension)"></i>
        <!-- img :src="getIcon(file.extension)" alt="file-icon" height="35" / -->
      </div>
    </div>
    <div class="card-body">
      <div class="content-wrapper" @click="clickContent">
        <p class="card-text file-name mb-0" v-text="file.name"></p>
        <p class="card-text file-size mb-0" v-text="file.size_display"></p>
        <p class="card-text file-date" v-text="file.last_modified"></p>
      </div>
      <small
        class="file-accessed text-muted"
        v-text="`Last modify: ${file.last_modified}`"
      ></small>
    </div>
    <el-dialog :visible.sync="preview">
      <el-image class="w-100" :src="url"></el-image>
    </el-dialog>

    <el-drawer v-if="show_info" :visible.sync="show_info">
      <vx-file-manager-info
        v-if="show_info"
        :show.sync="show_info"
        :data="{ ...file, ...{ icon: getIcon(file.extension) } }"
      ></vx-file-manager-info>
    </el-drawer>
  </div>
</template>

<script>
import feather from "feather-icons";
import vxFileManagerInfo from "./vx-file-manager-info.vue";
export default {
  components: { vxFileManagerInfo },
  props: {
    file: Object,
  },
  data() {
    return {
      checked: false,
      preview: false,
      url: null,
      show_info: false,
    };
  },
  created() {},
  mounted() {
    feather.replace({
      width: 14,
      height: 14,
    });
  },
  watch: {
    checked() {
      if (this.checked) {
        this.$emit("selected", this.file.path);
      } else {
        this.$emit("unselected", this.file.path);
      }
    },
  },
  computed: {
    canPreview() {
      return this.file.mime_type == "image/jpeg";
    },
  },
  methods: {
    clickContent() {
      this.$emit("input", this.file.path);

      if (this.canPreview) {
        this.handleCommand("preview");
      }
    },
    getIcon(extension) {
      let icon_map = {
        pdf: "far fa-lg fa-file-pdf",
        jpg: "far fa-lg fa-file-image",
        png: "far fa-lg fa-file-image",
        gif: "far fa-lg fa-file-image",
        js: "fa fa-lg fa-js-square",
        xls: "far fa-lg fa-file-excel",
        xlsx: "far fa-lg fa-file-excel",
        doc: "far fa-lg fa-file-word",
        docx: "far fa-lg fa-file-word",
      };

      return icon_map[extension] ?? "far fa-file fa-lg";
    },
    async handleCommand(command) {
      if (command == "info") {
        this.show_info = true;
        console.log(this.file);
        return;
      }

      if (command == "delete") {
        this.$confirm(`Delete ${this.file.name}?`).then(() => {
          this.$emit("delete", this.file.path);
        });
      }

      if (command == "rename") {
        this.$prompt("Please input new file name", {
          inputValue: this.file.name,
        }).then(({ value }) => {
          this.$emit("rename", {
            path: this.file.path,
            name: value,
          });
        });
      }

      if (command == "duplicate") {
        this.$emit("duplicate", this.file.path);
      }

      if (command == "preview") {
        let resp = await this.$vx.get("FileManager/readFile", {
          params: {
            path: this.file.path,
          },
        });

        let mime = resp.headers["content-type"];
        this.url = "data:" + mime + ";base64," + resp.data;

        this.preview = true;
      }

      if (command == "download") {
        let resp = await this.$vx.get("FileManager/readFile", {
          params: {
            path: this.file.path,
          },
        });
        let mime = resp.headers["content-type"];
        const a = document.createElement("a");
        a.href = "data:" + mime + ";base64," + resp.data;
        a.download = this.file.name; //filename to download
        a.click();
      }
    },
  },
};
</script>
