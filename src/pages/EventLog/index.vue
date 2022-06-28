<script setup>
import { createTable } from '@';

const table = createTable();
table.setDefaultSort("eventlog_id", "desc");

table.setDataSource("/EventLog");

let ac = table.addActionColumn();
ac.addView();

table.add("ID", "eventlog_id").sortable();
table.add("Class", "class").sortable();
table.add("Action", "action").sortable();
table.add("Created time", "created_time").sortable();

const render = table.render();
</script>

<template>
    <render />
</template>

