class Input {
    data = null
    field = null
    type = 'text'

    setData(data) {
        this.data = data;
    }

    setField(field) {
        this.field = field;
    }

    setType(type) {
        this.type = type
    }

    render() {
        return <el-input type={this.type}
            show-password={this.type == 'password'}
            vModel={this.data.value[this.field]}></el-input>;
    }
}

export default Input;