import FormItem from './FormItem';
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';
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
            name: "VxForm",
            methods: {
                onSubmit() {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            console.log(self.data);
                            ElMessage.success("Form Validation: Success!");
                        }
                    });
                }
            },
            render() {
                return <el-card>
                    <el-form model={ref(self.data)} ref="form">
                        {self.#childrens.map(item => item.render())}
                    </el-form>
                    <el-button type="primary" onClick={this.onSubmit}>提交</el-button>
                </el-card>
            }
        });
    }
};

export default Form;