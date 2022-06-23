import { ref } from 'vue';
class Select {

    vModel: any = null
    options: any[] = []

    setOptions(options: any[]) {
        this.options = options;
    }

    render() {
        return <el-select vModel={this.vModel.value}>
            {
                this.options.map((option: any) => {
                    return <el-option label={option.label} value={option.value}></el-option>
                })
            }
        </el-select>
    }
}

export default Select;