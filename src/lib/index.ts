import Vx from "./vx"
import { $axios, getCurrentInstance } from "./vx";
import Descriptions from "./Descriptions";
import Form from "./Form";
import Table from "./Table";


const createDescriptons = () => {
    return new Descriptions
}

const createForm = () => {
    return new Form
}

const createTable = () => {
    return new Table
}

export {
    Vx,
    createDescriptons,
    createForm,
    createTable,
    $axios,
    getCurrentInstance
};
