<script setup>
import Editor from "@tinymce/tinymce-vue";

import VxFileManager from "./vx-file-manager.vue";
import VxCodemirror from "./vx-codemirror.vue";
</script>
<template>
    <div>
        <Editor :init="mceInit" v-model="localValue" :api-key="apiKey" />

        <el-dialog v-model="showFM" width="80%" top="2vh" title="File manager">
            <VxFileManager v-model="content" @input="onSelectFile($event)" file-type="image" :accept="accept"
                default-action="select" />
        </el-dialog>

        <template v-if="showCode">
            <el-dialog v-model="showCode" width="80%" top="2vh" title="Code mirror" :append-to-body="true">
                <VxCodemirror v-model="content" class="mb-2" />
                <div>
                    <el-button type="primary" @click="onCodeOK">OK</el-button>
                    <el-button @click="showCode = false">Cancel</el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>
<script>
export default {

    props: {
        modelValue: String,
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
            localValue: this.modelValue,
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
                "filemanager",
                "codemirror",
                "code", "fullscreen", "image",
                "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                "searchreplace", "visualblocks", "code", "fullscreen",
                "wordcount",
                "insertdatetime", "media", "table", "wordcount",
            ],
            toolbar: "filemanager | codemirror | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            init_instance_callback(editor) {
                that.editor = editor;
                if (!that.apiKey) {
                    let freeTiny = document.querySelector(".tox-notifications-container");
                    if (freeTiny) {
                        freeTiny.style.display = "none";
                    }
                }
            }, setup(editor) {
                window.tinymce.PluginManager.add("codemirror");

                editor.ui.registry.addButton("codemirror", {
                    text: "Code",
                    onAction() {
                        that.showCode = true;
                        that.content = editor.getContent();
                    },
                });


                window.tinymce.PluginManager.add("filemanager");
                editor.ui.registry.addButton("filemanager", {
                    text: "File manager",
                    onAction() {
                        that.showFM = true;
                    },
                });

            }

        };
    },
    watch: {

        localValue() {
            this.$emit("update:modelValue", this.localValue);
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

            const p = (new DOMParser());
            const d = p.parseFromString(this.content, "text/html");
            let valid = this.getParentChildTag(d.body);


            this.editor.schema.addValidChildren(valid.join(","));
            this.editor.setContent(this.content);

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
