import Vx from "./vx"
import { $axios, getCurrentInstance } from "./vx";
import Descriptions from "./Descriptions";
import Form from "./Form";
import Table from "./Table";
//import { useRoute } from 'vue-router';
//declare const useRoute: () => any;

const createDescriptons = () => {
    return new Descriptions
}

const createForm = () => {
    return new Form
}

const createTable = () => {
    return new Table
}

import { useRoute } from 'vue-router';

const getObject = async () => {

    let route = useRoute();
    let ss = route.path.split("/");

    let r = "/" + ss[1] + "/" + route.params.id;

    let { data } = await $axios.get(r);
    return data;

}

export {
    Vx,
    createDescriptons,
    createForm,
    createTable,
    $axios,
    getCurrentInstance,
    getObject
};
