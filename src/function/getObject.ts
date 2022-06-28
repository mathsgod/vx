import { $axios } from "@";
import { useRoute } from 'vue-router';
import IModel from "@/interfaces/IModel";


const getObject = async (): Promise<IModel> => {
    let route = useRoute();
    let ss = route.path.split("/");

    let method = "create";
    let data: any = {};
    let meta = {}

    let r = "";
    if (!route.params.id) {
        r = "/" + ss[1];
        method = "create";
    } else {
        method = "update";
        r = "/" + ss[1] + "/" + route.params.id;
        let { data: d } = await $axios.get(r);
        data = d.data;
        meta = d.meta;
    }

    let dirty = {};

    return new Proxy(data, {
        get(target, prop) {
            if (prop == "save") {
                return function () {
                    if (method == "create") {
                        return $axios.post(r, target);
                    }

                    if (method == "update") {

                        //get dirty value
                        let d = {};
                        for (let key in dirty) {
                            d[key] = target[key];
                        }

                        return $axios.patch(r, d);

                    }
                };
            }
            return target[prop];
        },
        set(target, prop, value) {

            if (target[prop] != value) {
                dirty[prop] = true;
            }

            return Reflect.set(target, prop, value);
        }
    });
}

export default getObject;



