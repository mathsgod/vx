class TimePicker {

    data = null
    field = null
    setData(data) {
        this.data = data;
    }

    setField(field) {
        this.field = field;
    }

    render() {
        return <el-time-picker vModel={this.data.value[this.field]}></el-time-picker>;
    }
}

export default TimePicker;