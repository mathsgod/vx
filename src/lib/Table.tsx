import { $axios, getCurrentInstance } from "."
import { ElMessage } from 'element-plus'
import Column from "./Column";
import { defineComponent } from "vue";
import { stringify } from "qs";

class Table {

    #columns: Column[] = [];
    data: any[] = [];
    #fields: string[] = [];

    add(label: string, prop: string) {
        let column = new Column;
        column.setLabel(label);
        column.setProp(prop);

        this.#columns.push(column)

        if (prop) {
            this.#fields.push(prop);
        }
        return column;
    }


    source: string;

    async setDataSource(source: string) {
        this.source = source;
    }


    render() {
        let self = this;

        let isSearchable = this.#columns.some(column => column.isSearchable());

        let columnsWithSearch = this.#columns.filter(column => column.isSearchable());

        return defineComponent({

            data() {
                return {
                    currentPage: 1,
                    pageSize: 10,
                    data: [],
                    total: 0,
                    filters: {}
                }
            },

            async mounted() {
                this.reload();
            },

            methods: {
                onSizeChange() {
                    this.reload();
                },

                onCurrentChange() {
                    this.reload();

                },

                async reload() {
                    let filters = {};

                    for (let key in this.filters) {
                        filters[key] = { $contains: this.filters[key] };
                    }

                    let { data } = await $axios.get(self.source + "?" + stringify({
                        fields: self.#fields,
                        pagination: {
                            page: this.currentPage,
                            pageSize: this.pageSize,
                        },
                        filters
                    }));

                    this.data = data.data;
                    this.total = data.meta.pagination.total;
                }
            },

            render() {
                return <el-card shadow="never">
                    {
                        isSearchable && <el-collapse>
                            <el-collapse-item title="Search">
                                <el-form inline>
                                    {
                                        columnsWithSearch.map(column => <el-form-item label={column.getLabel()}>
                                            <el-input vModel={this.filters[column.getProp()]}></el-input>
                                        </el-form-item>)
                                    }

                                    <el-form-item>
                                        <el-button type="primary" onClick={this.reload}>Search</el-button>
                                    </el-form-item>


                                </el-form>

                            </el-collapse-item>

                        </el-collapse>

                    }
                    <el-table data={this.data}>
                        {
                            self.#columns.map(column => column.render())
                        }
                    </el-table>
                    <div class="row">
                        <q-space></q-space>
                        <el-pagination
                            vModel:currentPage={this.currentPage}
                            vModel:page-size={this.pageSize}
                            page-sizes={[10, 25, 50, 100]}
                            small="small"
                            layout="sizes, prev, pager, next"
                            total={this.total}
                            onSizeChange={this.onSizeChange}
                            onCurrentChange={this.onCurrentChange}
                        />

                    </div>

                </el-card>
            }
        });


    }
}
export default Table;
