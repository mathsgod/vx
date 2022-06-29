<template
>

    <div id="div1">
        <el-table size="mini">
            <el-table-column type="expand"><template v-slot="scope">
                    <el-button size="mini" v-on:click="onClick(scope.row.name)">add</el-button>
                    <el-table size="mini" :data="scope.row.columns">
                        <el-table-column><template v-slot="scope2">
                                <el-button size="mini" v-on:click="onRemove(scope.row.name, scope2.row.Field)">remove
                                </el-button>
                            </template></el-table-column>
                        <el-table-column label="Field" prop="Field"></el-table-column>
                        <el-table-column label="Type" prop="Type"></el-table-column>
                        <el-table-column label="Default" prop="Default"></el-table-column>
                        <el-table-column label="Extra" prop="Extra"></el-table-column>
                        <el-table-column label="Key" prop="Key"></el-table-column>
                    </el-table>
                </template></el-table-column>
            <el-table-column label="Name" prop="name" sortable></el-table-column>
        </el-table>
    </div>

</template>

