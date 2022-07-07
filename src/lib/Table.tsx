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

    #query: any = {}


    setRouter(router: Router) {
        this._router = router;
    }

    addExpand() {
        let column = new Column(this);
        column.setType("expand");
        this.#columns.push(column);
        return column;
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

    setDataSource(source: string, query: any = {}) {
        this.source = source;
        this.#query = query;
    }

    setDefaultSort(field: string, order: string) {
        this.#sort.push(`${field}:${order}`);
    }

    async reload() {
        if (this.#component) {
            await this.#component.methods.reload();
        }
    }


    render() {
        let self = this;

        let isSearchable = this.#columns.some(column => column.isSearchable());

        let columnsWithSearch = this.#columns.filter(column => column.isSearchable());


        let fields = [];
        this.#columns.forEach(column => {
            fields = [...fields, ...column.fields];
        });

        let search_operator = {};
        columnsWithSearch.forEach(column => {
            search_operator[column.getColumnKey()] = column.getSearchOperator();
        });

        this.#component = defineComponent({

            name: "VxTable",

            data() {
                return {
                    currentPage: 1,
                    pageSize: 10,
                    data: [],
                    total: 0,
                    filters: [],
                    searchs: {},
                    meta: [],
                    loading: false,
                    sort: self.#sort,
                }
            },

            async mounted() {
                this.reload();
            },

            methods: {
                async onSearch() {
                    this.currentPage = 1;
                    await this.reload();
                },
                async onFilterChange(filters) {
                    this.filters = filters;
                    await this.reload();
                },
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

                    for (let k in this.filters) {
                        filters[k] = { $in: this.filters[k] };
                    }

                    for (let key in this.searchs) {

                        if (this.searchs[key] !== null) {
                            let operator = search_operator[key];
                            filters[key] = {};
                            filters[key][operator] = this.searchs[key];
                        }
                    }


                    let query = self.#query;

                    query.fields = fields;
                    query.pagination = {
                        page: this.currentPage,
                        pageSize: this.pageSize,
                    };
                    query.filters = filters;
                    query.sort = this.sort;


                    let { data, status } = await $axios.get(self.source + "?" + stringify(query, { encodeValuesOnly: true }));
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

                                            {
                                                column.getSearchType() == "select" && <el-select v-model={this.searchs[column.getColumnKey()]} placeholder="Select" >
                                                    {
                                                        column.getSearchableOptions().map(option => <el-option label={option.label} value={option.value} />)
                                                    }
                                                </el-select>

                                            }
                                            {
                                                column.getSearchType() == "text" && <el-input clearable vModel={this.searchs[column.getColumnKey()]}></el-input>
                                            }
                                            {
                                                column.getSearchType() == "date" && <el-date-picker
                                                    valueFormat="YYYY-MM-DD"
                                                    type="daterange" vModel={this.searchs[column.getColumnKey()]}></el-date-picker>
                                            }

                                        </el-form-item>)
                                    }

                                    <el-form-item>
                                        <el-button type="primary" onClick={this.onSearch} icon="el-icon-search">Search</el-button>
                                    </el-form-item>

                                </el-form>

                            </el-collapse-item>

                        </el-collapse>

                    }
                    <el-table data={this.data}
                        onSortChange={this.onSortChange}
                        onFilterChange={this.onFilterChange}
                    >
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
                            small
                            layout="total, sizes, prev, pager, next"
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
