<script setup>
import { VxTinymce } from "@/components";

</script>


<template>
    <div>
        <VxTinymce v-model="content" />
        <div v-text="content"></div>

        <el-divider></el-divider>

        <VxTinymce v-model="content2" />
        <div v-text="content2"></div>

    </div>

</template> 

<script>
export default {
    data() {
        return {
            content: "<p>hello world</p>",
            content2: "<p>Content 2</p>"
        }
    }
}

</script>

