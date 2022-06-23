import FormItem from './FormItem';
import { defineComponent } from 'vue';
class Form {
    #childrens = [];
    data = null;
    setData(data) {
        this.data = data;
    }

    add(label: string) {
        let item = new FormItem;
        item.setData(this.data);
        item.setLabel(label);
        this.#childrens.push(item);
        return item;
    }

    render() {
        let self = this;
        return defineComponent({
            methods: {
                onClick() {
                    console.log(self.data)
                }
            },
            render() {
                return <el-card>
                    <el-form>
                        {self.#childrens.map(item => item.render())}
                    </el-form>
                    <el-button type="primary" onClick={this.onClick}>提交</el-button>
                </el-card>

            }

        });
    }
};

export default Form;