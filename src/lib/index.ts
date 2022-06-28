import Vx from "./vx"
import { $axios, getCurrentInstance } from "./vx";
import Descriptions from "./Descriptions";
import Form from "./Form";
import Table from "./Table";
import getObject from "./../function/getObject";
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

export {
    Vx,
    createDescriptons,
    createForm,
    createTable,
    $axios,
    getCurrentInstance,
    getObject
};
