import axios from 'axios';
class App {


    async init(config) {
        this.config = config;
        this.axios = axios.create({
            baseURL: config.endpoint
        });


        let resp = await this.get("/");
        resp = resp.data;


        this.logined = resp.logined;

        this.menus = resp.menus;
    }

    get(url, data) {
        return window.Vue.http.get(this.config.endpoint + url, data);
    }

    post(url, data) {
        return window.Vue.http.post(this.config.endpoint +  url, data);
    }
}

export default {
    install(Vue) {
        Vue.prototype.$app = new App();
        window.app = Vue.prototype.$app;
    }

}