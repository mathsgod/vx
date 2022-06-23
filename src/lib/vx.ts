import { AxiosInstance, default as _axios } from 'axios';

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

    constructor(config) {
        this.endpoint = config.endpoint;

        this.$axios = _axios.create({
            baseURL: this.endpoint,
            withCredentials: true,
            validateStatus: () => true
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

    async delete(url, data = null, config = null) {
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

    cancelViewAs() {
        this.view_as = null;
        localStorage.removeItem('vx-view-as');
    }


};

declare const window: any;
let vx;
export default {
    install(app, options) {
        vx = new VX(options);
        app.config.globalProperties.$vx = vx;
        window.vx = app.config.globalProperties.$vx;
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
