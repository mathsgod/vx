import DescriptionsItem from "./DescriptionItem";
class Descriptions {

    #children: any[] = [];
    #title: string;
    #data: any = {}

    setTitle(title: string) {
        this.#title = title;
    }

    addItem(label: string) {
        let item = new DescriptionsItem;
        item.setLabel(label);
        this.#children.push(item);
        return item;
    }

    add(label: string, field: string | Function) {
        let item = this.addItem(label);
        if (typeof field === "function") {
            item.template(() => {
                return field(this.#data);
            });
        } else {
            item.template(() => {
                return this.#data[field]
            });
        }

        return item;
    }

    setData(data: any) {
        console.log("set Data", data);
        this.#data = data;
    }

    render() {
        return <el-descriptions title={this.#title} column={1}>
            {this.#children.map(item => item.render())}
        </el-descriptions>

    }
}


export default Descriptions;
