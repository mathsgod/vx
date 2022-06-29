<script setup>
import { createTable } from "@";

const table = createTable();
table.setDataSource("/User");

let ac = table.addActionColumn();
ac.addView();
ac.addEdit();
ac.addDelete();

table.add('Username', "username").sortable();
table.add('First name', "first_name").sortable();
table.add('Last name', "last_name").sortable();
table.add("Email", "email").sortable();

const render = f.render();
</script>
<template>
    <render />
</template>