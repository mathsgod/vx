import { ref } from 'vue';
class Select {

    data = null
    field = null

    options: any[] = []

    #multiple = false;

    setData(data) {
        this.data = data;
    }

    setField(field) {
        this.field = field;
    }

    multiple(multiple: boolean = true) {
        this.#multiple = multiple;
        return this;
    }


    setOptions(options: any[]) {
        this.options = options;
    }

    render() {
        let c = [];
        if (this.#multiple) {
            c.push("w-100");
        }

        return <el-select vModel={ref(this.data).value[this.field]}
            class={c}
            multiple={this.#multiple}>
            {
                this.options.map((option: any) => {
                    return <el-option label={option.label} value={option.value}></el-option>
                })
            }
        </el-select>
    }
}

export default Select;