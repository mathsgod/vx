<script setup>
import { $axios } from '@';
import { createTable } from '@/lib';



const table = createTable();
table.setDataSource("/Config");
const ac = table.addActionColumn();
ac.addDelete();

table.add("Name", "name").sortable();
table.add("Value", "value").sortable();
const render = table.render();
</script>
<template>
    <render />
</template>


