import DatePicker from "./class/DatePicker";
import Input from "./class/Input";
import { ref } from "vue";
import TimePicker from "./class/TimePicker";
import Select from "./class/Select";
import CheckBox from "./class/CheckBox";

class FormItem {
    label = ''
    data = null
    #childrens = []
    #prop: string
    #required: boolean
    #rules = []

    setLabel(label: string) {
        this.label = label;
    }

    required(required: boolean = true) {
        this.#required = required;
        return this;
    }


    addRule(rule) {
        this.#rules.push(rule);
    }

    setData(data) {
        this.data = data;
    }

    email(field: string) {
        this.#prop = field;
        let input = new Input;
        input.setType('email');
        input.setData(this.data);
        input.setField(field)

        this.addRule({
            type: 'email',
        })

        this.#childrens.push(input);
        return input;
    }

    input(field: string) {
        this.#prop = field;
        let input = new Input;

        input.setData(this.data);
        input.setField(field)

        this.#childrens.push(input);
        return input;
    }

    password(field: string) {
        this.#prop = field;
        let input = new Input;
        input.setData(this.data);
        input.setField(field)
        input.setType('password')
        this.#childrens.push(input);
        return input;
    }

    datePicker(field: string) {
        this.#prop = field;
        let dp = new DatePicker
        dp.setData(this.data);
        dp.setField(field)
        this.#childrens.push(dp);
        return dp;
    }

    timePicker(field: string) {
        this.#prop = field;
        let dp = new TimePicker
        dp.setData(this.data);
        dp.setField(field)
        this.#childrens.push(dp);
        return dp;
    }

    select(field: string, options = []) {
        this.#prop = field;
        let select = new Select;
        select.setData(this.data);
        select.setField(field)
        select.setOptions(options)
        this.#childrens.push(select);
        return select;
    }

    checkbox(field: string) {
        this.#prop = field;
        let cb = new CheckBox;
        cb.setData(this.data);
        cb.setField(field)
        //   cb.vModel = ref(ref(this.data[field]).value).value;
        this.#childrens.push(cb);
        return cb;
    }

    textarea(field: string) {
        this.#prop = field;
        let input = new Input;

        input.setType('textarea');
        input.setData(this.data);
        input.setField(field)

        this.#childrens.push(input);
        return input;


    }

    render() {
        return <el-form-item
            label={this.label} prop={this.#prop}
            required={this.#required}
            rules={this.#rules}
        >
            {this.#childrens.map(item => item.render())}
        </el-form-item>;
    }
};

export default FormItem;