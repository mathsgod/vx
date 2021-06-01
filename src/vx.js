import axios from 'axios';
class VX {


    async init(config) {


        this.axios = axios.create({
            withCredentials: true,
            baseURL: config.endpoint
        });


        let resp = await this.get("/");
        resp = resp.data;

        console.log(resp);

        this.logined = resp.logined;

        this.menus = resp.menus;

        this.language = resp.language;

        this.config = resp.config;

        this.me = resp.me;
    }

    get(url, config) {

        return this.axios.get(url, config);
    }

    post(url, data) {
        return this.axios.post(url, data);
    }

    delete(url, config) {
        return this.axios.delete(url, config)
    }
}

export default {
    install(Vue) {

        Vue.prototype.$http = axios.create();

        Vue.prototype.$vx = new VX();
        window.vx = Vue.prototype.$vx;
    }

}