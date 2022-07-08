<script setup>
import { $axios } from '@/lib';

const { data } = await $axios.get("/System/database/table");

</script>
<template
>

    <div id="div1">
        <el-table :data="data">
            <el-table-column type="expand" #default="scope">
                <div class="px-2">
                    <el-button v-on:click="onClick(scope.row.name)" icon="el-icon-plus">add</el-button>
                </div>

                <el-table size="mini" :data="scope.row.columns">
                    <el-table-column><template v-slot="scope2">
                            <el-button size="mini" v-on:click="onRemove(scope.row.name, scope2.row.Field)"
                                icon="el-icon-minus">remove
                            </el-button>
                        </template></el-table-column>
                    <el-table-column label="Field" prop="Field"></el-table-column>
                    <el-table-column label="Type" prop="Type"></el-table-column>
                    <el-table-column label="Default" prop="Default"></el-table-column>
                    <el-table-column label="Extra" prop="Extra"></el-table-column>
                    <el-table-column label="Key" prop="Key"></el-table-column>
                </el-table>
            </el-table-column>
            <el-table-column label="Name" prop="name" sortable></el-table-column>
        </el-table>
    </div>

</template>

