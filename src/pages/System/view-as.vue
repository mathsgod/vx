<script setup>
import { $axios, getCurrentInstance } from "@";
import { stringify } from 'qs';

const { data } = await $axios.get("/User?" + stringify({
    fields: ["user_id", "username", "first_name", "last_name"],
    populate: {
        UserList: {
            fields: ["usergroup_id"],
            populate: {
                UserGroup: {
                    fields: ["name"]
                }
            }
        }
    }
}));

const users = data.data;

const viewAs = (user) => {

    let vx = getCurrentInstance();
    vx.viewAs(user.user_id);
    window.self.location.reload();
}

</script>
<template>
    <el-table :data="users" size="small">
        <el-table-column label="Username" prop="username" sortable></el-table-column>
        <el-table-column label="First name" prop="first_name" sortable></el-table-column>
        <el-table-column label="Last name" prop="last_name" sortable></el-table-column>
        <el-table-column label="Usergroup" #default="scope">
            <el-tag v-for="ul in scope.row.UserList" v-text="ul.UserGroup.name"></el-tag>
        </el-table-column>
        <el-table-column label="View as">
            <template #default="scope">
                <el-button @click="viewAs(scope.row)" size="small">View as </el-button>
            </template>
        </el-table-column>
    </el-table>

</template>
