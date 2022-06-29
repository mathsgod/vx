import { $axios } from "@"
import { ElMessage } from 'element-plus'
import Column from "./Column";
import { defineComponent } from "vue";
import { stringify } from "qs";
import ActionColumn from "./ActionColumn";
import { Router } from "vue-router";


class Table {

    #columns: Column[] = [];
    data: any[] = [];
    #sort = [];
    _router: Router = null;
    #component: any = null;
    #populate = {}

    setRouter(router: Router) {
        this._router = router;
    }

    addActionColumn() {
        let column = new ActionColumn(this)
        column.setWidth("100");
        this.#columns.push(column);
        return column;
    }

    add(label: string, prop: string) {
        let column = new Column(this);
        column.setLabel(label);
        column.setProp(prop);
        if (prop) {
            column.fields.push(prop);
        }
        this.#columns.push(column)

        return column;
    }


    source: string;

    setDataSource(source: string) {
        this.source = source;
    }

    setDefaultSort(field: string, order: string) {
        this.#sort.push(`${field}:${order}`);
    }

    async reload() {
        if (this.#component) {
            await this.#component.methods.reload();
        }
    }

    setPopulate(populate: Object) {
        this.#populate = populate;
    }

    render() {
        let self = this;

        let isSearchable = this.#columns.some(column => column.isSearchable());

        let columnsWithSearch = this.#columns.filter(column => column.isSearchable());


        let fields = [];
        this.#columns.forEach(column => {
            fields = [...fields, ...column.fields];
        });

        this.#component = defineComponent({

            name: "VxTable",

            data() {
                return {
                    currentPage: 1,
                    pageSize: 10,
                    data: [],
                    total: 0,
                    filters: {},
                    meta: [],
                    loading: false,
                    sort: self.#sort,
                }
            },

            async mounted() {
                this.reload();
            },

            methods: {
                onSortChange({ column, prop, order }) {
                    this.sort = [];
                    if (column) {

                        if (order == "descending") {
                            this.sort.push(`${prop}:desc`);
                        } else {
                            this.sort.push(`${prop}:asc`);
                        }
                    }
                    this.reload();
                },

                onSizeChange() {
                    this.reload();
                },

                onCurrentChange() {
                    this.reload();

                },

                async reload() {
                    this.loading = true;
                    let filters = {};

                    for (let key in this.filters) {
                        filters[key] = { $contains: this.filters[key] };
                    }



                    let { data, status } = await $axios.get(self.source + "?" + stringify({
                        fields,
                        pagination: {
                            page: this.currentPage,
                            pageSize: this.pageSize,
                        },
                        filters,
                        sort: this.sort,
                        populate: self.#populate
                    }));
                    this.loading = false;

                    if (status != 200) {
                        if (data.error) {
                            ElMessage.error(data.error.message);
                        } else {
                            ElMessage.error("Error");
                        }

                        return;
                    }

                    this.data = data.data;
                    this.total = data.meta.pagination.total;
                    this.meta = data.meta;
                }
            },

            render() {
                return <el-card shadow="never" v-loading={this.loading}>
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
                                        <el-button type="primary" onClick={this.reload} icon="el-icon-search">Search</el-button>
                                    </el-form-item>

                                </el-form>

                            </el-collapse-item>

                        </el-collapse>

                    }
                    <el-table data={this.data} onSortChange={this.onSortChange}>
                        {
                            self.#columns.map(column => column.render(this.meta, this))
                        }
                    </el-table>
                    <div class="row mt-1">
                        <el-button icon="el-icon-refresh" onClick={this.reload}></el-button>
                        <q-space></q-space>
                        <el-pagination
                            background
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


        return this.#component;

    }
}
export default Table;
