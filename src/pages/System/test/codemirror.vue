<script setup>
import { VxCodemirror } from "@/components";

</script>

<template>
    <div>

        <VxCodemirror v-model="value"></VxCodemirror>


        <div v-text="value">
        </div>
    </div>


</template>

<script>
export default {
    data() {
        return {
            value: "<p>hello world</p>",
        };
    },

}
</script>