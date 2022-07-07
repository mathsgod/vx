<script setup>
import { createTable } from '@';

const table = createTable();
table.setDefaultSort("eventlog_id", "desc");

table.setDataSource("/EventLog");

let ac = table.addActionColumn();
ac.addView();

table.add("ID", "eventlog_id").sortable().searchable();
table.add("Class", "class").sortable().searchable();
table.add("Action", "action").sortable().searchable();
table.add("Created time", "created_time").sortable();
table.add("Created by", "created_by");
const render = table.render();
</script>

<template>
    <render />
</template>

