import { ref } from 'vue';
class Switch {
    data = null
    field = null

    setData(data) {
        this.data = data;
    }

    setField(field) {
        this.field = field;
    }

    render() {
        return <el-switch vModel={ref(this.data).value[this.field]} />
    }

}

export default Switch;