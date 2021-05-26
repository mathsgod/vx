import axios from 'axios';
class VX {


    async init(config) {

        this.config = config;
        this.axios = axios.create({
            withCredentials: true,
            baseURL: config.endpoint
        });


        let resp = await this.get("/");
        resp = resp.data;


        this.logined = resp.logined;

        this.menus = resp.menus;

        this.language = resp.language;
    }

    get(url, data) {

        return this.axios.get(url, data);
    }

    post(url, data) {
        return this.axios.post(url, data);
    }
}

export default {
    install(Vue) {

        Vue.prototype.$http = axios.create();

        Vue.prototype.$vx = new VX();
        window.vx = Vue.prototype.$vx;
    }

}