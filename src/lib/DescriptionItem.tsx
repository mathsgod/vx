class DescriptionsItem {

    #label: string;
    #template: CallableFunction;

    setLabel(label: string) {
        this.#label = label;
    }

    template(callable: CallableFunction) {
        this.#template = callable;
    }

    render() {
        return <el-descriptions-item label={this.#label}>{this.#template()}</el-descriptions-item>
    }
}

export default DescriptionsItem;