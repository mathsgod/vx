<script setup>
import { createTable } from "@";
let table = createTable()
table.setDataSource("/UserLog")
table.add("ID", "userlog_id").sortable().setWidth(100);
table.add("Login time", "login_dt").sortable();
table.add("Logout time", "logout_dt").sortable();
table.add("IP address", "ip").sortable();
table.add("Result", "result").sortable();
table.add("User agent", "user_agent").sortable();

const render = table.render();
</script>

<template>
    <render />
</template>