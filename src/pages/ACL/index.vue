<script setup>
import { createTable } from "@";

const table = createTable();
table.setDataSource("/ACL", {
    populate: {
        UserGroup: {
            fields: ["name"]
        },
        User: {
            fields: ["first_name", "last_name"]
        }
    }
});
table.add("Module", "module");
table.add("Path", "path");
table.add("Action", "action");
table.add("User", "User.first_name");
table.add("User Group", "UserGroup.name");
table.add("Value", "value");
table.add("Type", "type");


const render = table.render();

</script>
<template>
    <render />
</template>