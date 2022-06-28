<script setup>
import { $axios } from '@';
const { data } = await $axios.get("/System/index")
</script>
<template>
    <q-card bordered flat>
        <q-card-section>

            <q-list>
                <q-expansion-item label="SERVER">
                    <el-table :data="data" size="small">
                        <el-table-column label="Name" prop="name" width="200"></el-table-column>
                        <el-table-column label="Value" prop="value"></el-table-column>
                    </el-table>

                </q-expansion-item>
            </q-list>

        </q-card-section>
    </q-card>

</template>