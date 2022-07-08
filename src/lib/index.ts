import { $axios, getCurrentInstance } from "./vx";
import Descriptions from "./Descriptions";
import Form from "./Form";
import Table from "./Table";
import getObject from "./../function/getObject";
import getMe from "./../function/getMe";
import { useRouter } from 'vue-router';
import getData from "./../function/getData";
//declare const useRoute: () => any;

const createDescriptions = () => {
    return new Descriptions
}

const createForm = () => {
    return new Form
}

const createTable = () => {
    let table = new Table
    table.setRouter(useRouter())
    return table;
}

export {
    createDescriptions,
    createForm,
    createTable,
    $axios,
    getCurrentInstance,
    getObject,
    getMe,
    getData
};

import Vx from "./vx"
export default Vx;

