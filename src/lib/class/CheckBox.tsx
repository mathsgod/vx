import { ref } from 'vue';
class CheckBox {

    data = null
    field = null

    setData(data) {
        this.data = data;
    }

    setField(field) {
        this.field = field;
    }

    render() {
        return <el-checkbox vModel={ref(this.data).value[this.field]}></el-checkbox>;
    }


}

export default CheckBox;