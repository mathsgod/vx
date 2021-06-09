import axios from 'axios';
class VX {


    async init(config) {
        this.axios = axios.create({
            withCredentials: true,
            baseURL: config.endpoint
        });

        this.access_token = localStorage.getItem("access_token");

        this.axios.defaults.headers.Authorization = "Bearer " + this.access_token;

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

    logout() {
        console.log("logout");
    }


    getSelectedLanguage() {
        return this.language[this.me.language];
    }

    async setSelectedLanguage(language) {
        let resp = (await this.post("/", {
            action: "selectedLanguage",
            data: language
        })).data;

        if (resp.code == 200) {
            this.me.language = language;
        }
    }


    setNavbarColor(color) {
        return this.post("/", {
            action: "navbar_color",
            data: color
        });
    }

    setNavbarType(type) {
        return this.post("/", {
            action: "navbar_type",
            data: type
        });
    }

    setLayout(layout) {
        return this.post("/", {
            action: "layout",
            data: layout
        });
    }




}

export default {
    install(Vue) {

        Vue.prototype.$http = axios.create();

        Vue.prototype.$vx = new VX();
        window.vx = Vue.prototype.$vx;
    }

}