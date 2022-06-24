<script setup lang="jsx">
import { ref } from 'vue'
import { createTable, $axios, createDescriptons, createForm } from "./lib";

//let { data: user2 } = await $axios.get("/User/1");

let b = ref("bb");

let user = {
    first_name: "first_name",
}

let form = createForm();
form.setData(user);
form.add("First name").input("first_name");
form.add("Last name").required().input("last_name");
form.add("Email").email("email");
form.add("Password").required().password("password");

form.add("Date").datePicker("date");
form.add("Time").timePicker("time");
form.add("Select").required().select("select", [
    {
        value: 1,
        label: "One"
    },
    {
        value: 2,
        label: "Two"
    },
    {
        value: 3,
        label: "Three"
    }
]);

form.add("CB").checkbox("cb1");
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
const onClick = () => {
    console.log(a.value);
}

</script>

<template>
    <div>
        <fa />

        <el-divider></el-divider>

        <de />
        <el-divider></el-divider>
        <render />


        <el-button @click="onClick">click</el-button>

    </div>
</template>
