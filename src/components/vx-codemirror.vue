<template>
    <div ref="editor"></div>
</template>
<script>
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state"
//import prettify from "html-prettify";
//import { html } from 'js-beautify';

import { html } from "@codemirror/lang-html";

export default {
    name: "vx-codemirror",
    props: {
        modelValue: String,
    },
    mounted() {
        let self = this;
        this.$nextTick(() => {
            let editor = new EditorView({
                parent: this.$refs.editor,
                state: EditorState.create({
                    doc: this.modelValue,
                    extensions: [
                        basicSetup, html(),
                        EditorView.updateListener.of(function (e) {

                            self.$emit("update:modelValue", e.state.doc.toString());
                        })
                    ]
                }),
            });
        });
    },
};
</script>
