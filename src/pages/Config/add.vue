<script setup>
import { createForm, $axios } from '@/lib';

const form = createForm();
form.setData({
    save() {
        return $axios.post("/Config", form.data);
    }
})


form.add("Name").required().input("name");
form.add("Value").required().input("value");


const render = form.render();
</script>

<template>
    <render />
</template>
