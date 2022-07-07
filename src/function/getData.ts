import { $axios } from "@";
import { stringify } from "qs";

const getData = async (model: string, query: any): Promise<any> => {


    let { data } = await $axios.get(`/${model}` + (query ? `?${stringify(query, { encodeValuesOnly: true })}` : ""));

    return data.data;


};

export default getData;
