import DatePicker from "./DatePicker";
import Input from "./Input";
import { ref } from "vue";

class FormItem {
    label = ''
    data = null
    #childrens = []

    setLabel(label: string) {
        this.label = label;
    }

    setData(data) {
        this.data = ref(data);
    }

    input(field: string) {
        let input = new Input;
        input.setData(this.data);
        input.setField(field)
        this.#childrens.push(input);
        return input;
    }

    password(field: string) {
        let input = new Input;
        input.setData(this.data);
        input.setField(field)
        input.setType('password')
        this.#childrens.push(input);
        return input;
    }

    addDatePicker(field: string) {
        let dp = new DatePicker
        dp.setData(this.data);
        dp.setField(field)
        this.#childrens.push(dp);
        return dp;
    }

    render() {
        return <el-form-item label={this.label}>
            {this.#childrens.map(item => item.render())}
        </el-form-item>;
    }
};

export default FormItem;