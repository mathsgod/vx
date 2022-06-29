import { $axios } from "@";

interface Me {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    addr_1: string;
    addr_2: string;
    addr_3: string
}
const getMe = async (): Promise<Me> => {

    let { data } = await $axios.get("/me");
    return data;
}

export default getMe;

