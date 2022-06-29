import FormItem from './FormItem';
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';
import Divider from './class/Divider';

import IModel from '@/interfaces/IModel';
class Form {
    #childrens = [];
    data = null;
    #beforeSubmit = null;
    #labelPosition: string = "right";

    setData(data) {
        this.data = data;
    }

    setLabelPosition(labelPosition) {
        this.#labelPosition = labelPosition;
    }

    addDivider(label: string = "") {
        let divider = new Divider;
        divider.content = label;
        this.#childrens.push(divider);
        return divider;
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
            data() {
                return {
                    labelPosition: self.#labelPosition
                }

            },
            methods: {
                onSubmit() {

                    this.$refs.form.validate(async (valid) => {
                        if (valid) {

                            if (self.#beforeSubmit) {
                                if (self.#beforeSubmit() === false) {
                                    return;
                                }
                            }

                            let save = self.data.save;
                            if (save) {
                                let { status, data } = await save();

                                if (status != 204) {
                                    if (data.error) {
                                        ElMessage.error(data.error.message);
                                        return;
                                    }
                                    ElMessage.error(data.reason_phrase);
                                } else {
                                    ElMessage.success("Update success");
                                }
                            }

                        }
                    });
                }
            },
            render() {

                let cl = "";
                if (this.labelPosition === "top") {
                    cl = "";
                } else {
                    cl = "row"
                }

                return <el-card
                >
                    <el-form class={cl} model={ref(self.data)} ref="form" label-width="auto"
                        label-position={this.labelPosition}
                    >
                        {self.#childrens.map(item => item.render())}
                    </el-form>

                    <el-button type="primary" onClick={this.onSubmit} icon="el-icon-check">提交</el-button>


                </el-card>
            }
        });
    }

    beforeSubmit(beforeSubmit) {
        this.#beforeSubmit = beforeSubmit;;

    }
};

export default Form;