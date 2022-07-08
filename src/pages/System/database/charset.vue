<script setup>
import { $axios } from '@/lib';
let { data: { view, table } } = await $axios.get("/System/database/charset");
console.log(view);
console.log(table);
</script>
<template>

    <el-card id="card1" class="mb-2">
        <el-descriptions :column="1">
            <el-descriptions-item label="character_set_database">{{ view["@@character_set_database"] }}
            </el-descriptions-item>
            <el-descriptions-item label="collation_database">{{ view["@@collation_database"] }}</el-descriptions-item>
        </el-descriptions>



        <el-button @click="change">Change to utf8mb4</el-button>
        <el-button @click="change_column">Change all column to table default</el-button>
        <el-divider />

        <el-table :data="table">
            <el-table-column label="Name" prop="Name"></el-table-column>
            <el-table-column label="Collation" prop="Collation"></el-table-column>
        </el-table>


    </el-card>

</template>

<script>
export default {


    methods: {
        async change() {
            let {
                data,
                status
            } = await this.$vx.post("charset");

            if (data.error) {
                this.$message.error(data.error.message);
                return;
            }

            if (status == 200) {
                this.$message("Update successfully");
                return;
            }
        },
        async change_column() {
            let {
                data,
                status
            } = await this.$vx.post("charset?_entry=change_column");
            if (data.error) {
                this.$message.error(data.error.message);
                return;
            }

            if (status == 200) {
                this.$message("Update successfully");
                return;
            }
        }
    }
}
</script>
