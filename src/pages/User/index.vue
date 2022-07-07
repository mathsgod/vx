<script setup lang="jsx">
import { createTable } from "@";

const table = createTable();
table.setDataSource("/User", {
    populate: {
        UserList: {
            //fields: ["usergroup_id"],
            populate: {
                UserGroup: {
                    fields: ["name"]
                }
            }
        }
    }
});

let ac = table.addActionColumn();
ac.addView();
ac.addEdit();
ac.addDelete();

table.add('Username', "username").sortable();
table.add('First name', "first_name").sortable();
table.add('Last name', "last_name").sortable();
table.add("Email", "email").sortable();

table.add("UserGroup", "").template((row) => {
    return row.UserList.map(ul => {
        return <el-tag>{ul.UserGroup.name}</el-tag>
    })
});

const render = table.render();
</script>
<template>
    <render />
</template>