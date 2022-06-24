import { ref } from 'vue';
class Select {

    data = null
    field = null

    options: any[] = []

    setData(data) {
        this.data = data;
    }

    setField(field) {
        this.field = field;
    }


    setOptions(options: any[]) {
        this.options = options;
    }

    render() {
        return <el-select vModel={ref(this.data).value[this.field]}>
            {
                this.options.map((option: any) => {
                    return <el-option label={option.label} value={option.value}></el-option>
                })
            }
        </el-select>
    }
}

export default Select;