<script setup lang="tsx">
import { createTable } from '@';
let table = createTable();
await table.setDataSource("/UserGroup", {
    populate: {
        UserList: {
            populate: {
                User: {
                    fields: ["first_name", "last_name", "name"]
                }
            }
        }
    }
});

table.addExpand().template(row => {
    return <el-table data={row.UserList}>
        <el-table-column label="First name" prop="User.first_name" sortable></el-table-column>
        <el-table-column label="Last name" prop="User.last_name" sortable></el-table-column>
    </el-table>
});

let ac = table.addActionColumn();
ac.addView();
ac.addEdit();
ac.addDelete();

table.add("Name", "name").sortable().searchable();
table.add("Code", "code").sortable();

const render = table.render();
</script>
<template>
    <render />
</template>