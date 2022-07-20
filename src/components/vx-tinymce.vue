<template>
  <div>
    <tinymce :init="mceInit" v-model="localValue" :api-key="apiKey" ref="tinymce"></tinymce>
    <template v-if="showFM">
      <el-dialog :visible.sync="showFM" width="80%" top="2vh" title="File manager">
        <vx-file-manager v-model="content" @input="onSelectFile($event)" file-type="image" :accept="accept"
          default-action="select"></vx-file-manager>
      </el-dialog>
    </template>

    <template v-if="showCode">
      <el-dialog :visible.sync="showCode" width="80%" top="2vh" title="Code mirror" :append-to-body="true">
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
    allowAllHtmlTag: Boolean
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
    const p = (new DOMParser());
    const d = p.parseFromString(this.localValue, "text/html");
    let valid = this.getParentChildTag(d.body);

    let validString = valid.join(",");

    let that = this;
    this.mceInit = {
      relative_urls: false,
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
      init_instance_callback(editor) {
        that.editor = editor;
        if (!that.apiKey) {
          let freeTiny = document.querySelector(".tox-notifications-container");
          if (freeTiny) {
            freeTiny.style.display = "none";
          }
        }
      },
      //extended_valid_elements: "a[div]",
      forced_root_block: "",
      setup(editor) {
        editor.on("init", () => {
          if (that.allowAllHtmlTag) {
            editor.schema.addValidChildren(validString);
          }

          editor.setContent(that.localValue);
        });

        window.tinymce.PluginManager.add("filemanager");
        editor.ui.registry.addButton("filemanager", {
          text: "File manager",
          onAction() {
            that.showFM = true;
          },
        });

        window.tinymce.PluginManager.add("codemirror");
        // Add a button that opens a window
        editor.ui.registry.addButton("codemirror", {
          text: "Code",
          onAction() {
            that.showCode = true;
            that.content = editor.getContent();
          },
        });
      },
    };

    if (this.allowAllHtmlTag) {
      this.mceInit.valid_elements = "*[*]";
    }
  },
  watch: {
    value() {
      this.localValue = this.value;
    },
    localValue() {
      this.$emit("input", this.localValue);
    },
  },
  methods: {

    getParentChildTag(n) {
      let tags = [];

      for (let child of n.childNodes) {
        if (child.tagName) {
          tags.push("+" + n.tagName.toLowerCase() + "[" + child.tagName.toLowerCase() + "]");

          let ts = this.getParentChildTag(child);
          tags = tags.concat(ts);
        }
      }


      return tags;

    },
    onCodeOK() {
      //      this.localValue = this.content;
      this.showCode = false;
      if (this.allowAllHtmlTag) {
        const p = (new DOMParser());
        const d = p.parseFromString(this.content, "text/html");
        let valid = this.getParentChildTag(d.body);
        this.$refs.tinymce.editor.schema.addValidChildren(valid.join(","));
      }

      this.$refs.tinymce.editor.setContent(this.content);

      this.localValue = this.content;
      this.$emit("input", this.content);
    },
    onSelectFile(path) {
      this.showFM = false;
      let img = document.createElement("img");
      //img.src = "http://192.168.88.108:8001/vx/uploads/" + path;
      img.src = this.baseUrl + path;

      this.editor.insertContent(img.outerHTML);
    },
  },
};
</script>
