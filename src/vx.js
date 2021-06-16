import axios from 'axios';
class VX {


    async init(config) {
        let headers = {};

        if (localStorage.getItem("vx-view-as")) {
            headers["vx-view-as"] = localStorage.getItem("vx-view-as");
        }

        this.axios = axios.create({
            withCredentials: true,
            baseURL: config.endpoint,
            headers: headers

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

        this.navbar = resp.navbar;
    }

    get(url, config) {
        return this.axios.get(url, config);
    }

    post(url, data) {
        return this.axios.post(url, data);
    }

    put(url, data, config) {
        return this.axios.put(url, data, config);
    }

    patch(url, data, config) {
        return this.axios.patch(url, data, config);
    }

    delete(url, config) {
        return this.axios.delete(url, config)
    }

    async login(username, password) {

        let resp = (await this.post("/login", {
            username: username,
            password: password
        })).data;

        if (resp.error) {
            throw resp.error.message;
        }

        if (resp.data) {
            localStorage.setItem("access_token", resp.data.access_token);
            localStorage.setItem("refresh_token", resp.data.refresh_token);

            this.access_token = resp.data.access_token;
            this.refresh_token = resp.data.refresh_token;
            return;
        }

        throw "server error";
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

    async refreshAccessToken() {

        let resp = (await this.post("/", {
            action: "renew_access_token",
            refresh_token: this.refresh_token
        })).data;

        if (resp.error) {
            throw resp.error.message;
        }

        if (resp.data) {
            this.access_token = resp.data.access_token;
            localStorage.setItem("access_token", this.access_token);
        }
    }

    viewAs(user_id) {
        this.view_as = user_id;
        localStorage.setItem("vx-view-as", user_id);
    }

    cancelViewAs() {
        this.view_as = null;
        localStorage.removeItem('vx-view-as');
    }

    setRouter(router) {
        this.$router = router;
    }

    setRoute(route) {
        this.$route = route;
    }

    forgotPassword(username, email) {
        return this.post("/", {
            action: "forgot_password",
            data: {
                username,
                email
            }
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