export default class {



    data = {}

    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    set(target, key, value) {
        this.data[key] = value;
        Reflect.set(...arguments);
    }

    get(target, key) {
        if (key == "save") {
            return () => {
                return this.axios.patch(this.url, this.data);
            }
        }
        return Reflect.get(...arguments);
    }


}