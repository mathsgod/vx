<script setup>
import { createTable } from "@/lib";

let f = createTable();
await f.setDataSource("/User");

let ac = f.addActionColumn();
ac.addView();
ac.addEdit();
ac.addDelete();

f.add('Username', "username").sortable();
f.add('First name', "first_name").sortable();
f.add('Last name', "last_name").sortable();
f.add("Email", "email").sortable();


const render = f.render();
</script>
<template>
    <render />
</template>