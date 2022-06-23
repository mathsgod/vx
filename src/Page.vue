<script setup lang="jsx">
import { createTable, $axios, createDescriptons, createForm } from "./lib";

let { data: user2 } = await $axios.get("/User/1");

let form = createForm();
form.setData(user2);
form.add("First name").input("first_name");
const fa = form.render();
/* 

let { data: user } = await $axios.get("/User/1");

let d = createDescriptons()
d.setTitle("title")
d.add("Username", "username");
d.add("First name", "first_name");
d.add("Last name", "last_name");
d.add("Email", "email");
d.add("Templte", (u) => {
    return <el-tag>{u.first_name} {u.last_name}</el-tag>
})
d.setData(user);
const de = d.render();

let t = createTable();
t.add("User ID", "user_id");
t.add("First name", "first_name").sortable().searchable();
t.add("Last name", "last_name");
t.add("Username", "username");
t.add("Email", "email");
t.add("Template", "").template(function (row) {
    return <el-link href={`/User/${row.user_id}`}>{row.first_name} {row.last_name}</el-link>;
});
t.setDataSource("/User");


//t.setData();
const render = t.render(); */

</script>

<template>
    <div>

        <fa />

        <el-divider></el-divider>

        <de />
        <el-divider></el-divider>
        <render />


    </div>
</template>
