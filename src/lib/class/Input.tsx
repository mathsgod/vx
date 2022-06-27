import { ref } from 'vue';
class Input {
    data = null
    field = null
    type = 'text'

    vModel: any;

    setData(data) {
        this.data = data;
    }

    setField(field) {
        this.field = field;
    }

    setType(type: string) {
        this.type = type
    }

    render() {
        let input = <el-input type={this.type}
            show-password={this.type == 'password'}
            vModel={ref(this.data).value[this.field]}
        ></el-input>

        return input;
    }
}

export default Input;