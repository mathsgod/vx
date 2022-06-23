class Input {
    data = null
    field = null
    type = 'text'
    vModel: any;

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
            v-model={this.vModel}
        ></el-input>;
    }
}

export default Input;