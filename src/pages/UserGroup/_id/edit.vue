<script setup>
import { getObject, createForm } from "@"

let table = createForm();
table.setData(await getObject());

table.add("Name").required().input("name");
table.add("Code").input("code");
table.add("Remark").textarea("remark");

const render = table.render();
</script>

<template>
    <render />
</template>