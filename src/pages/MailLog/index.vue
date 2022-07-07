<script setup>
import { createTable } from '@/lib';

const table = createTable();
table.setDefaultSort("maillog_id", "desc");
table.setDataSource("/MailLog");

table.add("ID", "maillog_id").width("100").sortable();
table.add("From", "from").sortable().searchable();
table.add("To", "to").sortable().searchable();
table.add("Subject", "subject").sortable().searchable();
table.add("Created time", "created_time").sortable();

const render = table.render();
</script>

<template>
    <render />
</template>
