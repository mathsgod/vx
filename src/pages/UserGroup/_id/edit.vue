<script setup>
import { createForm, getObject } from "@/lib";

const form = createForm();
form.setData(await getObject());
form.add("Name").required().input("name");
form.add("Remark").textarea("remark");

const render = form.render();
</script>
<template>
    <render />
</template>

