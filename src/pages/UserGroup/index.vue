<script setup>
import { createTable } from '@';
let table = createTable();
await table.setDataSource("/UserGroup");
let ac = table.addActionColumn();
ac.addView();
ac.addEdit();
ac.addDelete();

table.add("Name", "name").sortable().searchable();
table.add("Code", "code").sortable();

const render = table.render();
</script>
<template>
    <render />
</template>