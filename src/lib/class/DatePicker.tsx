import { ref } from 'vue';
class DatePicker {
    data = null
    field = null
    setData(data) {
        this.data = data;
    }

    setField(field) {
        this.field = field;
    }

    render() {
        return <el-date-picker
            value-format="YYYY-MM-DD"
            vModel={ref(this.data).value[this.field]}></el-date-picker>;
    }
};

export default DatePicker;