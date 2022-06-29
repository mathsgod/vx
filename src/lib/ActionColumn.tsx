import Column from "./Column";
import { ElMessageBox } from "element-plus";
import { View, Edit } from "@element-plus/icons-vue";
import { $axios } from "@";

class ActionColumn extends Column {

    addView() {

        let router = this._table._router;


        this.fields.push("__canRead");
        this._children.push((row, meta) => {
            if (row.__canRead) {
                let id = row[meta.primaryKey];
                let href = "/" + meta.model + "/" + id + "/view";
                return <el-link class="mx-1" onClick={() => { router.push(href) }} icon="el-icon-view"></el-link>
            }
        });
    }

    addEdit() {
        this.fields.push("__canUpdate");
        let router = this._table._router;

        this._children.push((row, meta) => {
            if (row.__canUpdate) {
                let id = row[meta.primaryKey];
                let href = "/" + meta.model + "/" + id + "/edit";

                return <el-link class="mx-1" onClick={() => { router.push(href) }} icon="el-icon-edit"></el-link>
            }

        });
    }

    addDelete() {
        this.fields.push("__canDelete");

        this._children.push((row, meta) => {
            if (row.__canDelete) {
                let id = row[meta.primaryKey];
                let href = "/" + meta.model + "/" + id;
                return <el-link class="mx-1" onClick={() => this.#delete(href)} icon="el-icon-delete"></el-link>
            };


        }
        );
    }

    #delete(url: string) {
        ElMessageBox.confirm("Are you sure to delete this record?", "Delete", {
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            type: "warning"
        }).then(() => {
            $axios.delete(url).then(() => {

                if (this.table_node) {
                    this.table_node.reload();
                }




            });
        });
    }
}

export default ActionColumn;