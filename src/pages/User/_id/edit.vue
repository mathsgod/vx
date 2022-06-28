<script setup>
import { createForm, getObject } from "@"
let data = await getObject();
console.log(data);
let f = createForm();
f.setData(data);
f.add("Username").required().input("username");
f.add("First name").required().input("first_name");
f.add("Last name").input("last_name");
f.add("Email").required().input("email");
const render = f.render();



</script>
<template>
    <render />
</template>