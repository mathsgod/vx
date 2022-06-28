<script setup>
import { createDescriptons, getObject } from '@';

let v = createDescriptons();
v.setData(await getObject())
v.add("Eventlog id", "eventlog_id");
v.add("Class", "class");
v.add("Action", "action");
v.add("Created time", "created_time");


const render = v.render();

</script>

<template>
    <el-card>
        <render />
    </el-card>

</template>