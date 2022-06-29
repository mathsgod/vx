<script setup>
import { createTable } from '@/lib';

const table = createTable();
table.setDefaultSort("maillog_id", "desc");
table.setDataSource("/MailLog");
table.add("ID", "maillog_id").sortable();
table.add("From", "from").sortable();
table.add("To", "to").sortable();
table.add("Subject", "subject").sortable();
table.add("Created time", "created_time").sortable();

const render = table.render();
</script>

<template>
    <render />
</template>
