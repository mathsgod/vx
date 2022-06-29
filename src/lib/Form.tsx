import FormItem from './FormItem';
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';
import Divider from './class/Divider';

import IModel from '@/interfaces/IModel';
class Form {
    #childrens = [];
    data: any = {};
    #beforeSubmit = null;
    #labelPosition: string = "right";
    #form = ref(null)

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

    beforeSubmit(beforeSubmit) {
        this.#beforeSubmit = beforeSubmit;;
    }

    onSubmit() {

        this.#form.value.validate(async (valid) => {
            if (valid) {
                if (this.#beforeSubmit) {
                    if (this.#beforeSubmit() === false) {
                        return;
                    }
                }

                let save = this.data.save;
                if (save) {
                    let { status, data } = await save();

                    if (status == 201) {
                        ElMessage.success("Created Successfully");
                        return
                    }

                    if (status == 204) {
                        ElMessage.success("Updated Successfully");
                        return
                    }

                    if (data.error) {
                        ElMessage.error(data.error.message);
                        return;
                    } else if (data.reason_phrase) {
                        ElMessage.error(data.reason_phrase);
                    } else {
                        ElMessage.error("unknown error");
                    }


                }
            }
        });
    }

    render() {
        let self = this;


        let cl = "";
        if (this.#labelPosition === "top") {
            cl = "";
        } else {
            cl = "row"
        }



        return <el-card>
            <el-form class={cl} model={ref(this.data)} ref={this.#form} label-width="auto"
                label-position={this.#labelPosition}
            >
                {self.#childrens.map(item => item.render())}
            </el-form>

            <el-button type="primary" onClick={() => { this.onSubmit() }} icon="el-icon-check">提交</el-button>
        </el-card>
    }

};

export default Form;