<template>
  <div>
    <tinymce :init="mceInit" v-model="localValue" :api-key="apiKey"></tinymce>
    <template v-if="showFM">
      <el-dialog :visible.sync="showFM" width="80%" top="2vh" title="File manager">
        <vx-file-manager
          v-model="content"
          @input="onSelectFile($event)"
          file-type="image"
          :accept="accept"
          default-action="select"
        ></vx-file-manager>
      </el-dialog>
    </template>

    <template v-if="showCode">
      <el-dialog
        :visible.sync="showCode"
        width="80%"
        top="2vh"
        title="Code mirror"
        :append-to-body="true"
      >
        <vx-codemirror v-model="content" class="mb-1"></vx-codemirror>
        <div>
          <el-button type="primary" @click="onCodeOK">OK</el-button>
          <el-button @click="showCode = false">Cancel</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import tinymce from "@tinymce/tinymce-vue";
//import tinymce_filemanager from "./tinymce-plugin-filemanager";

import VxFileManager from "./vx-file-manager.vue";
import VxCodemirror from "./vx-codemirror.vue";

export default {
  components: {
    tinymce: tinymce,
    VxFileManager,
    VxCodemirror,
  },
  props: {
    value: String,
    accept: String,
    height: {
      type: Number,
      default: 600,
    },

    baseUrl: {
      type: String,
      default: "/uploads/",
    },

    apiKey: String,
  },

  data() {
    return {
      localValue: this.value,
      mceInit: {},
      showFM: false,
      editor: null,
      showCode: false,
      content: "",
    };
  },
  created() {
    let that = this;
    this.mceInit = {
      height: this.height,
      apply_source_formatting: true,
      convert_urls: false,
      plugins: [
        "filemanager codemirror code fullscreen image",
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste imagetools wordcount",
      ],
      toolbar:
        "filemanager codemirror undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
      init_instance_callback() {
        if (!that.apiKey) {
          let freeTiny = document.querySelector(".tox-notifications-container");
          freeTiny.style.display = "none";
        }
      },
      setup() {
        window.tinymce.PluginManager.add("filemanager", (editor) => {
          editor.ui.registry.addButton("filemanager", {
            text: "File manager",
            onAction() {
              // Open window
              that.editor = editor;
              that.showFM = true;
            },
          });
        });

        window.tinymce.PluginManager.add("codemirror", (editor) => {
          // Add a button that opens a window
          editor.ui.registry.addButton("codemirror", {
            text: "Code",
            onAction() {
              that.editor = editor;
              that.showCode = true;
              that.content = editor.getContent();
            },
          });
        });
      },
    };
  },
  mounted() {},
  watch: {
    content() {
      console.log(this.content);
    },
    localValue() {
      this.$emit("input", this.localValue);
    },
  },
  methods: {
    onCodeOK() {
      this.editor.setContent(this.content);
      this.showCode = false;
    },
    onSelectFile(path) {
      console.log("insert content");
      this.showFM = false;
      let img = document.createElement("img");
      //img.src = "http://192.168.88.108:8001/vx/uploads/" + path;
      img.src = this.baseUrl + path;

      this.editor.insertContent(img.outerHTML);
    },
  },
};
</script>
