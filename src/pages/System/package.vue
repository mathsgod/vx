<script setup>
import { $axios } from '@';
const { data } = await $axios.get("/System/package");
</script>
<template>
    <el-table :data="data">
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Version" prop="version"></el-table-column>
    </el-table>
</template>

