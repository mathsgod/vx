<script setup>
import { createTable } from "@";

const table = createTable();
table.setDataSource("/ACL");
table.add("Module", "module");
table.add("Path", "path");
table.add("Action", "action");
table.add("User", "user_id");



const render = table.render();

</script>
<template>
    <render />
</template>