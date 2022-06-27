import Column from "./Column";
import { ElMessageBox } from "element-plus";
import { View, Edit } from "@element-plus/icons-vue";
import { $axios } from "@";

class ActionColumn extends Column {
    addView() {
        this.fields.push("__canRead");
        this._children.push((row, meta) => {
            if (row.__canRead) {
                let id = row[meta.primaryKey];
                let href = "/" + meta.model + "/" + id + "/view";
                return <router-link to={href} class="mx-1"><el-icon><View /></el-icon></router-link>;

            }
        });
    }

    addEdit() {
        this.fields.push("__canUpdate");

        this._children.push((row, meta) => {
            if (row.__canUpdate) {
                let id = row[meta.primaryKey];
                let href = "/" + meta.model + "/" + id + "/edit";
                return <router-link to={href} class="mx-1"><el-icon><Edit /></el-icon></router-link>;
            }

        });
    }

    addDelete() {
        this.fields.push("__canDelete");

        this._children.push((row, meta) => {
            if (row.__canDelete) {
                let id = row[meta.primaryKey];
                let href = "/" + meta.model + "/" + id + "/delete";
                return <el-link onClick={() => this.#delete(href)} icon="el-icon-delete"></el-link>
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
                ElMessageBox.alert("Deleted successfully", "Success");
            });
        });
    }
}

export default ActionColumn;