class Column {
    #label: string
    #prop: string
    #sortable: boolean = false
    #searchable: boolean = false
    #template;

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

    sortable(sortable: boolean = true) {
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

    render() {
        let self = this;
        return <el-table-column
            sortable={this.#sortable}
            label={this.#label}
            prop={this.#prop}

            v-slots={

                {
                    default: function ({ row }) {
                        if (self.#template) {
                            return self.#template(row)
                        }
                    }
                }
            }>



        </el-table-column>
    }
}

export default Column