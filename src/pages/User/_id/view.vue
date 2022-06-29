<script setup>
import { createDescriptions, getObject } from '@';

let v = createDescriptions();
v.setData(await getObject());

v.add("Username", "username");
v.add("First name", "first_name");
v.add("Last name", "last_name");
let render = v.render();
</script>

<template>
    <el-card>
        <render />
    </el-card>
</template>