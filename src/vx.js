import axios from 'axios';
import { useRegistration } from '@web-auth/webauthn-helper';
import { useLogin } from '@web-auth/webauthn-helper';


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
            this.axios.defaults.headers.Authorization = "Bearer " + this.accessToken;
        }


        let { data } = await this.get("/");

        this.version = data.version;

        this.logined = data.logined;

        this.menus = data.menus;
        this.favs = data.favs;

        this.language = data.language;

        this.config = data.config;

        this.me = data.me;

        this.navbar = data.navbar;


        this.i18n = window.i18n;
        this.i18n.locale = data.locale;
        let messages = this.i18n.getLocaleMessage(data.locale ?? "en");
        messages = { ...messages, ...data.i18n };
        this.i18n.setLocaleMessage(data.locale, messages);

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
            actionUrl: this.endpoint + "?_entry=authAssertion&username="+username,
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

    async get(url, config) {
        let resp = this.axios.get(url, config);

        try {
            await resp;
        } catch (e) {
            if (e.response.status == 401) {
                await this.renewAccessToken();
                return this.get(url, config);
            }
        }

        return resp;
    }

    post(url, data, config) {
        if (url === null) {
            url = this.$route.path;
        }
        return this.axios.post(url, data, config);
    }

    put(url, data, config) {
        if (url === null) {
            url = this.$route.path;
        }
        return this.axios.put(url, data, config);
    }

    patch(url, data, config) {
        if (url === null) {
            url = this.$route.path;
        }
        return this.axios.patch(url, data, config);
    }

    delete(url, config) {
        if (url === null) {
            url = this.$route.path;
        }
        return this.axios.delete(url, config)
    }

    async login(username, password) {
        let { data } = await this.post("/login", {
            username: username,
            password: password
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
            throw data.error.message;
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

}

export default {
    install(Vue) {

        Vue.prototype.$http = axios.create();

        Vue.prototype.$vx = new VX();
        window.vx = Vue.prototype.$vx;
    }

}