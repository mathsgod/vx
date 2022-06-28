<script setup>
import { createForm, getObject } from "@";
const form = createForm();
form.setData(await getObject());
form.add("Name").required().input("name");
form.add("Code").input("code");
form.add("Remark").textarea("remark");
const render = form.render();
</script>
<template>
    <render />
</template>

