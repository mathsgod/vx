<script setup>
import { createTable, getData } from "@";
let table = createTable()
table.setDataSource("/UserLog", {
    populate: {
        User: {
            fields: ["first_name"]
        }
    }
});

table.add("ID", "userlog_id").sortable().setWidth(100);
table.add("User", "User.first_name").columnKey("user_id").searchableSelect(
    (await getData("User")).map(user => {
        return {
            value: user.user_id,
            label: user.first_name
        }
    })
).setWidth(200);

table.add("Login time", "login_dt").sortable().searchable("date");
table.add("Logout time", "logout_dt").sortable();
table.add("IP address", "ip").sortable().searchable();

table.add("Result", "result").sortable().filters([
    {
        text: "SUCCESS",
        value: "SUCCESS"
    },
    {
        text: "FAIL",
        value: "FAIL"
    }
]);

table.add("User agent", "user_agent").sortable().overflow().searchable();



const render = table.render();
</script>

<template>
    <render />
</template>