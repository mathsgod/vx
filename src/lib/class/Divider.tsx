class Divider {
    content: string = "";
    #position = "";

    render() {
        return <el-divider contentPosition={this.#position}>{this.content}</el-divider>
    }

    setContentPosition(position: string) {
        this.#position = position;
    }
}

export default Divider;