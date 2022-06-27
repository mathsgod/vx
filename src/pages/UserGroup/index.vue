<script setup>
import { createTable } from '@';
let table = createTable();
await table.setDataSource("/UserGroup");
table.add("Name", "name");

const render = table.render();
</script>
<template>
    <render />
</template>