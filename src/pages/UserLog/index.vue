<script setup>
import { createTable } from "@";
let f = createTable()
f.add("ID", "userlog_id");

const render = f.render();
</script>

<template>
    <render />
</template>