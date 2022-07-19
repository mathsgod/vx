import axios from 'axios';
import { useRegistration } from '@web-auth/webauthn-helper';
import { useLogin } from '@web-auth/webauthn-helper';
import package_json from './../package.json';

import Model from "./model.js";
class VX {
    endpoint;

    async init(config) {
        this.accessToken = "";
        this.endpoint = config.endpoint;
        let headers = {};

        if (localStorage.getItem("vx-view-as")) {
            headers["vx-view-as"] = localStorage.getItem("vx-view-as");
        }

        axios.defaults.validateStatus = function () {
            return true;
        };

        this.axios = axios.create({
            withCredentials: true,
            baseURL: config.endpoint,
            headers: headers
        });

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

        if (data.locale != "en") {
            this.i18n.setLocaleMessage("en", data.i18n_en);
        }

        this.i18n_messages = messages;
        this.i18n_module_messages = data.i18n_module;

        this.breakpoint = {

        };

        window.addEventListener("resize", this.onResize);

        this.onResize();

    }

    onResize() {
        this.breakpoint = {
            xs: window.innerWidth < 576,
            sm: window.innerWidth < 768,
            md: window.innerWidth < 992,
            lg: window.innerWidth < 1200,
            xl: window.innerWidth >= 1200
        };
    }

    loadJS() {

        let scripts = this.config.js.map((url) => {
            return window.$.getScript(url);
        });

        return new Promise((resolve) => {
            window.$.when(...scripts).done(resolve);
        });

    }

    loadCSS() {

        for (let css of this.config.css) {

            new Promise((resolve, reject) => {

                let link = document.createElement('link');
                link.href = css;
                link.rel = 'stylesheet';

                link.onload = () => resolve(link);
                link.onerror = () => reject(`Style load error for ${css}`);

                document.head.append(link);


            });

        }

    }

    async reload() {
        let { data } = await this.get("/");
        this.menus = data.menus;
        this.favs = data.favs;
    }

    object(uri) {
        if (!uri) {
            let link = "/";
            let s = this.$route.path.split("/");
            if (s.length >= 1) {
                link += s[1];
            }
            if (this.objectID) {
                link += "/" + this.objectID;
            }
            uri = link;
        }

        let p = new Promise(resolve => {

            if (!this.objectID) {
                let p = new Proxy({}, new Model(this.axios, uri, this.objectID))
                resolve(p);
                return;
            }


            this.get(uri).then(resp => {

                let p = new Proxy(resp.data, new Model(this.axios, uri, this.objectID))
                resolve(p);
            });
        });
        return p;
    }

    get objectID() {
        let s = this.$route.path.split("/");
        if (s.length >= 2) {
            return parseInt(s[2]);
        }
        return null;
    }

    async authLogin(username) {
        const login = useLogin({
            actionUrl: this.endpoint + "auth/assertion?username=" + username,
            optionsUrl: this.endpoint + "auth/request-options",
        });

        let resp = await login({
            username,
            userVerification: true
        });

        if (resp.error) {
            throw resp.error.message;
        }
    }

    async authRegister() {
        const register = useRegistration({
            actionUrl: this.endpoint + "auth/register",
            optionsUrl: this.endpoint + "auth/register-options"
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

    async $get(url, config) {
        let { data } = await this.get(url, config);
        return data;
    }

    async get(url, config) {
        let u = this.processUrl(url);
        let resp = await this.axios.get(u, config);

        if (resp.status == 401) {
            await this.renewAccessToken();
            return this.get(u, config);
        }

        return resp;
    }

    async post(url, data, config) {
        let u = this.processUrl(url);
        let resp = await this.axios.post(u, data, config);
        if (resp.status == 401) {
            await this.renewAccessToken();
            return this.post(u, data, config);
        }
        return resp;
    }

    async put(url, data, config) {
        let u = this.processUrl(url);
        let resp = await this.axios.put(u, data, config);
        if (resp.status == 401) {
            await this.renewAccessToken();
            return this.put(u, data, config);
        }
        return resp;
    }

    async patch(url, data, config) {
        let u = this.processUrl(url);
        let resp = await this.axios.patch(u, data, config);
        if (resp.status == 401) {
            await this.renewAccessToken();
            return this.patch(u, data, config);
        }
        return resp;
    }

    async delete(url, config) {
        let u = this.processUrl(url);
        let resp = await this.axios.delete(u, config);
        if (resp.status == 401) {
            await this.renewAccessToken();
            return this.delete(u, config);
        }
        return resp;
    }

    async login(username, password, code) {
        let { data, status } = await this.post("/auth/login", {
            username: username,
            password: password,
            code: code
        });

        if (status == 200) {
            return;
        }
        throw data.error.message;
    }

    async logout() {
        await this.post("/auth/logout");
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
        return await this.post("/auth/renew-token");
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

    loadScript(url) {
        return new Promise(function (resolve) {
            const script = document.createElement('script');
            script.src = url;

            script.addEventListener('load', function () {
                // The script is loaded completely
                resolve(true);
            });

            document.head.appendChild(script);
        });
    }

}

export default {
    install(Vue) {

        Vue.prototype.$http = axios.create({
            withCredentials: true
        });

        Vue.prototype.$vx = new VX();
        window.vx = Vue.prototype.$vx;
    }

}