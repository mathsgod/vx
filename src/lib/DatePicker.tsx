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
        return <el-date-picker vModel={this.data.value[this.field]}></el-date-picker>;
    }
};

export default DatePicker;