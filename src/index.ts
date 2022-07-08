import './style/index.css';

// Bootstrap
import './scss/bootstrap.scss';


import 'element-plus/dist/index.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

// Import Quasar css
import "./scss/quasar.scss";

import './scss/main.scss';


import {
    createDescriptions,
    createForm,
    createTable,
    $axios,
    getCurrentInstance,
    getObject,
    getMe,
    getData,
} from "./lib";

//routes
import routes from "./routes";

export {
    createDescriptions,
    createForm,
    createTable,
    $axios,
    getCurrentInstance,
    getObject,
    getMe,
    getData,
    routes
};

 
import { default as Vx } from "./lib/vx";
export default Vx;