<script setup>
import { createForm } from "@";
const form = createForm();
form.setData({});
form.add("Name").required().input("name");
const render = form.render();
</script>
<template>
    <render />
</template>

