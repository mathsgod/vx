import axios from 'axios';
import { useRegistration } from '@web-auth/webauthn-helper';
import { useLogin } from '@web-auth/webauthn-helper';
import package_json from './../package.json';

import jwtDecode from "jwt-decode";
import moment from "moment";

class VX {
    endpoint;

    async init(config) {
        this.endpoint = config.endpoint;
        let headers = {};

        if (localStorage.getItem("vx-view-as")) {
            headers["vx-view-as"] = localStorage.getItem("vx-view-as");
        }

        this.axios = axios.create({
            withCredentials: true,
            baseURL: config.endpoint,
            headers: headers
        });


        if (this.accessToken) {
            let payload = jwtDecode(this.accessToken);
            if (payload.exp < moment().unix()) { //expired
                await this.renewAccessToken();
            }
        }

        if (this.accessToken) {
            this.axios.defaults.headers.Authorization = "Bearer " + this.accessToken;
        }


        let { data } = await this.get("/");
        if (data.error) {
            throw data.error.message;
        }



        this.version = data.version;
        this.version.push({
            name: "vx",
            value: package_json.version
        });

        this.logined = data.logined;

        this.menus = data.menus;
        this.favs = data.favs;

        this.language = data.language;

        this.config = data.config;

        this.me = data.me;

        this.navbar = data.navbar;

        this.file_upload_max_size = data.file_upload_max_size;

        this.i18n = window.i18n;
        this.i18n.locale = data.locale;
        let messages = this.i18n.getLocaleMessage(data.locale ?? "en");
        messages = { ...messages, ...data.i18n };

        this.i18n.setLocaleMessage(data.locale, messages);
        this.i18n_messages = messages;
        this.i18n_module_messages = data.i18n_module;
    }

    async reload() {
        let { data } = await this.get("/");
        this.menus = data.menus;
        this.favs = data.favs;
    }

    set accessToken(token) {
        localStorage.setItem("access_token", token);
        if (token) {
            this.axios.defaults.headers.Authorization = "Bearer " + token;
        } else {
            this.axios.defaults.headers.Authorization = null;
        }
    }

    get objectID() {
        let s = this.$route.path.split("/");
        if (s.length >= 2) {
            return parseInt(s[2]);
        }
        return null;
    }

    get accessToken() {
        return localStorage.getItem("access_token");
    }

    set refreshToken(token) {
        localStorage.setItem("refresh_token", token);
    }

    get refreshToken() {
        return localStorage.getItem("refresh_token");
    }

    async authLogin(username) {

        const login = useLogin({
            actionUrl: this.endpoint + "?_entry=authAssertion&username=" + username,
            optionsUrl: this.endpoint + "?_entry=authRequestOptions"
        });

        let resp = await login({
            username,
            userVerification: true
        });
        if (resp.error) {
            throw resp.error.message;
        }

        if (resp.access_token) {
            this.accessToken = resp.access_token;
        }

        if (resp.refreshToken) {
            this.refreshToken = resp.refresh_token;
        }


    }

    async authRegister() {

        const register = useRegistration({
            actionUrl: this.endpoint + "User/auth_register",
            actionHeader: {
                Authorization: "Bearer " + this.accessToken,
            },
            optionsUrl: this.endpoint + "User/auth_register_options"
        }, {
            Authorization: "Bearer " + this.accessToken,
        });
        return await register()
    }


    processUrl(url) {
        if (url === undefined) {
            return this.$route.fullPath;
        }
        if (url.substring(0, 1) != "/") {
            let path = this.$route.path.split("/");
            path.pop();
            path.push(url);
            return path.join("/");
        }

        return url;
    }

    async get(url, config) {
        let u = this.processUrl(url);
        let resp = this.axios.get(u, config);
        try {
            await resp;
        } catch (e) {
            if (e.response.status == 401) {
                await this.renewAccessToken();
                return this.get(u, config);
            }
        }
        return resp;
    }

    post(url, data, config) {
        let u = this.processUrl(url);
        return this.axios.post(u, data, config);
    }

    put(url, data, config) {
        let u = this.processUrl(url);
        return this.axios.put(u, data, config);
    }

    patch(url, data, config) {
        let u = this.processUrl(url);
        return this.axios.patch(u, data, config);
    }

    delete(url, config) {
        let u = this.processUrl(url);
        return this.axios.delete(u, config)
    }

    async login(username, password, code) {
        let { data } = await this.post("/login", {
            username: username,
            password: password,
            code: code
        });

        if (data.error) {
            throw data.error.message;
        }
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
    }

    logout() {
        this.accessToken = "";
        this.refreshToken = "";
        this.logined = false;
    }


    getSelectedLanguage() {
        return this.language[this.me.language];
    }

    async setSelectedLanguage(language) {
        let resp = await this.post("/?_entry=setLanguage", {
            language
        });

        if (resp.status == 204) {
            this.me.language = language;
        }
    }


    setNavbarColor(color) {
        return this.post("/?_entry=setNavbarColor", { color });
    }

    setNavbarType(type) {
        return this.post("/?_entry=setNavbarType", { type });
    }

    setLayout(layout) {
        return this.post("/?_entry=setLayout", { layout });
    }

    setFooterType(type) {
        return this.post("/?_entry=setFooterType", { type });
    }

    setCollapsible(collapsible) {
        return this.post("/?_entry=setCollapsible", { collapsible });
    }

    async renewAccessToken() {
        this.accessToken = "";

        if (!this.refreshToken) {
            return;
        }
        let { data } = await this.post("/?_entry=renew_access_token", {
            refresh_token: this.refreshToken
        });

        if (data.error) {
            this.refreshToken = "";
            return;
        }

        if (data.access_token) {

            this.accessToken = data.access_token;
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

        if (route.params.module != this.module) {
            this.module = route.params.module;

            //change message
            let l = this.i18n_module_messages[this.module] ?? [];
            this.i18n.setLocaleMessage(this.i18n.locale, { ...this.i18n_messages, ...l });
        }

    }

    forgotPassword(username, email) {
        return this.post("/?_entry=forgotPassword", {
            username,
            email
        });
    }

    resetPassword(password, token) {
        return this.post("/?_entry=resetPassword", {
            password,
            token
        });
    }

    addMyFavorite(label, path) {
        return this.post("/?_entry=addMyFavorite", {
            label,
            path
        });
    }

    removeMyFavorite(path) {
        return this.post("/?_entry=removeMyFavorite", { path });
    }

    loadScript(src) {
        return new Promise((resolve) => {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.addEventListener("load", resolve);
            script.src = src;

            document.getElementsByClassName("content-body")[0].appendChild(script);


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