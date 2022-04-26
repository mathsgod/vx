export default class {
    data = {}

    constructor(axios, url, id) {
        this.axios = axios;
        this.url = url;
        this.id = id;
    }

    set(target, key, value) {
        this.data[key] = value;
        Reflect.set(...arguments);
    }

    get(target, key) {
        if (key == "save") {
            return () => {
                if (this.id) {
                    return this.axios.patch(this.url, this.data);
                } else {
                    return this.axios.post(this.url, this.data).then((response) => {
                        this.url = response.headers["content-location"];
                        this.id = this.url.split("/").pop();
                    });
                }

            }
        }
        return Reflect.get(...arguments);
    }


}