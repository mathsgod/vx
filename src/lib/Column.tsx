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
    #type = null;
    #fixed: boolean = false;
    #showOverflowTooltip = false;
    #filters: Array<{ text: string, value: string }> = null;
    #columnKey: string = null;

    #searchable_type = null;
    #searchable_field = null;
    #searchable_options: Array<{ label: string, value: string }> = [];
    #searchable_operator = "$eq";

    constructor(table: Table) {
        this._table = table;
    }


    filters(filters: Array<{ text: string, value: string }>): Column {
        this.#filters = filters;
        this.#columnKey = this.#prop;
        return this;
    }

    columnKey(columnKey: string) {
        this.#columnKey = columnKey;
        return this;
    }

    fixed(fixed: boolean = true) {
        this.#fixed = fixed;
        return this;
    }


    width(width: string) {
        this.#width = width;
        return this;
    }

    setWidth(width: string) {
        this.#width = width;
    }

    setType(type: string) {
        this.#type = type;
    }

    getSearchType() {
        return this.#searchable_type;
    }

    getSearchOperator() {
        return this.#searchable_operator;
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

    getSearchField() {
        return this.#searchable_field || this.#prop;
    }

    getProp() {
        return this.#prop
    }

    overflow(overflow: boolean = true) {
        this.#showOverflowTooltip = overflow;
        return this;
    }


    sortable(sortable: string | boolean = "custom") {
        this.#sortable = sortable
        return this;
    }

    searchable() {
        this.#searchable = true;
        this.#searchable_type = "text";
        this.#searchable_operator = "$contains";
        return this;
    }

    searchableDate() {
        this.#searchable = true;
        this.#searchable_type = "date";
        this.#searchable_operator = "$between";
        return this;
    }

    searchableSelect(options: Array<{ label: string, value: string }>) {
        this.#searchable = true;
        this.#searchable_type = "select";
        this.#searchable_options = options;
        this.#searchable_operator = "$eq";

        return this;
    }

    getColumnKey() {
        if (this.#columnKey) {
            return this.#columnKey;
        }
        return this.#prop;

    }

    getSearchableOptions(): Array<any> {
        return this.#searchable_options || [];
    }


    isSearchable() {
        return this.#searchable
    }

    template(callback: (row: any) => void) {

        this.#template = callback;

    }


    render(meta, table) {

        let self = this;
        this.table_node = table;


        return <el-table-column
            sortable={this.#sortable}
            label={this.#label}
            prop={this.#prop}
            columnKey={this.#columnKey}
            width={this.#width}
            type={this.#type}
            fixed={this.#fixed}
            showOverflowTooltip={this.#showOverflowTooltip}
            filters={this.#filters}
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