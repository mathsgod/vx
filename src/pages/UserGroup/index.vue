<script setup>
import { createTable } from '@';
let table = createTable();
await table.setDataSource("/UserGroup");
let ac = table.addActionColumn();
ac.addView();
ac.addEdit();
ac.addDelete();

table.add("Name", "name");
table.add("Code", "code");

const render = table.render();
</script>
<template>
    <render />
</template>