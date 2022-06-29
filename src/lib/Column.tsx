import Table from "./Table"
class Column {
    #label: string
    #prop: string
    #sortable: string | boolean = false
    #searchable: boolean = false
    #template;
    _children = [];
    fields = []
    #width = null;

    _table: Table = null;
    table_node: null;

    constructor(table: Table) {
        this._table = table;
    }

    setWidth(width: string) {
        this.#width = width;
    }


    getLabel() {
        return this.#label
    }

    setLabel(label: string) {
        this.#label = label
    }

    setProp(prop: string) {
        this.#prop = prop

    }

    getProp() {
        return this.#prop
    }

    sortable(sortable: string | boolean = "custom") {
        this.#sortable = sortable
        return this;
    }

    searchable(searchable: boolean = true) {
        this.#searchable = searchable
        return this
    }

    isSearchable() {
        return this.#searchable
    }

    template(callback: (row: Object) => void) {

        this.#template = callback;

    }

    render(meta, table) {

        let self = this;
        this.table_node = table;


        return <el-table-column
            sortable={this.#sortable}
            label={this.#label}
            prop={this.#prop}
            width={this.#width}

            v-slots={

                {
                    default: function ({ row }) {
                        if (self.#template) {
                            return self.#template(row)
                        }

                        return self._children.map((child) => child(row, meta));
                    }

                }
            }>



        </el-table-column>
    }
}

export default Column