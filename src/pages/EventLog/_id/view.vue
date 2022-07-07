<script setup>
import { createDescriptions, getObject } from '@';

let v = createDescriptions();
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