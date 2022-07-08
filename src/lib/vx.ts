import axios, { AxiosInstance, default as _axios } from 'axios';
import { useDark, useToggle } from '@vueuse/core'
import { useLogin, useRegistration } from '@web-auth/webauthn-helper';
import { Dark } from 'quasar'
let $axios: AxiosInstance;

class VX {
    endpoint: string;
    $route;
    logined = false;
    config = {};
    locale = "en";
    me: null;
    navbar: null;
    version = {};
    language = {};
    menus = {};
    $axios: AxiosInstance;
    view_as = null;
    style = {};

    constructor(config) {
        this.endpoint = config.endpoint;

        let headers = {};
        if (localStorage.getItem("vx-view-as")) {
            headers["vx-view-as"] = localStorage.getItem("vx-view-as");
        }

        this.$axios = _axios.create({
            baseURL: this.endpoint,
            withCredentials: true,
            validateStatus: () => true,
            headers
        });

        $axios = this.$axios;
    }

    setRoute(route) {
        this.$route = route;
    }

    async init() {
        let { data } = await this.get("/");

        this.config = data.config;
        this.logined = data.logined;
        this.me = data.me;
        this.navbar = data.navbar;
        this.version = data.version;
        this.locale = data.locale;
        this.language = data.language;
        this.menus = data.menus;
        if (data.me) {
            this.style = data.me.style;
        }

    }

    async login(username: string, password: string, code) {
        let { status, data } = await this.post("/auth/login", {
            username: username,
            password: password,
            code: code
        });

        if (status == 200) {
            return true;
        }

        throw data.error.message;
    }

    async logout() {
        await this.post("/auth/logout");
        this.logined = false;
    }


    async useDark(value) {
        const isDark = useDark()
        const toggle = useToggle(isDark)
        toggle(value)
        Dark.set(value);

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
        //get one time token
        let { data } = await this.get("/auth/token");

        const register = useRegistration({
            actionUrl: this.endpoint + "auth/register?token=" + data.token,
            optionsUrl: this.endpoint + "auth/register-options?token=" + data.token,
        });
        return await register()
    }

    async get(url, config = null) {
        let u = this.processUrl(url);
        let resp = await this.$axios.get(u, config);

        if (resp.status == 401) {
            await this.renewAccessToken();
            return await this.$axios.get(u, config);
        }

        return resp;
    }


    async post(url, data = null, config = null) {
        let u = this.processUrl(url);
        let resp = await this.$axios.post(u, data, config);

        if (resp.status == 401) {
            await this.renewAccessToken();
            return await this.$axios.post(u, data, config);
        }

        return resp;
    }

    async put(url, data = null, config = null) {
        let u = this.processUrl(url);
        let resp = await this.$axios.put(u, data, config);

        if (resp.status == 401) {
            await this.renewAccessToken();
            return await this.$axios.put(u, data, config);
        }

        return resp;
    }

    async patch(url, data = null, config = null) {
        let u = this.processUrl(url);
        let resp = await this.$axios.patch(u, data, config);

        if (resp.status == 401) {
            await this.renewAccessToken();
            return await this.$axios.patch(u, data, config);
        }

        return resp;
    }

    async delete(url, config = null) {
        let u = this.processUrl(url);
        let resp = await this.$axios.delete(u, config);

        if (resp.status == 401) {
            await this.renewAccessToken();
            return await this.$axios.delete(u, config);
        }
        return resp;
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


};

declare const window: any;
let vx;


// element plus icons
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import { VxFileManager } from "@/components";

export default {
    install(app, options) {
        vx = new VX(options);
        app.config.globalProperties.$vx = vx;
        window.vx = app.config.globalProperties.$vx;

        // element plus icons
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {

            //key to underscore
            const keyUnderscore = key.replace(/([A-Z])/g, '_$1').toLowerCase();
            //removing the first _
            const keyUnderscore2 = keyUnderscore.replace(/^_/, '');
            //replace _ to -
            const keyUnderscore3 = keyUnderscore2.replace(/_/g, '-');
            app.component("el-icon-" + keyUnderscore3, component)
        }

        app.component("vx-file-manager", VxFileManager);

    }
}

export function get(url, config = null) {
    return vx.get(url, config);
}

function getCurrentInstance(): VX {
    return vx;
}


export {
    $axios,
    getCurrentInstance
};
