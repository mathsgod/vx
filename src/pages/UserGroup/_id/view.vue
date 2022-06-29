<script setup>
import { getObject, createDescriptions } from "@"

let desc = createDescriptions();
desc.setData(await getObject());
desc.add("Name", "name");
desc.add("Code", "code");
desc.add("Remark", "remark");

const render = desc.render();
</script>

<template>
    <el-card>
        <render />
    </el-card>
</template>