import 'devextreme/dist/css/dx.common.css';
//import './themes/generated/dx.generic.t1.css';
import './themes/generated/theme1.base.css';
import './themes/generated/theme1_.base.css';
import './themes/generated/theme.additional.css';
import { createApp}  from "vue";
import router from "./router";

import App from "./App";
import appInfo from "./app-info";

import {Promised} from 'vue-promised' 

const app = createApp(App)
app.use(router)
app.component ('Promised', Promised)
app.config.globalProperties.$appInfo = appInfo
app.mount('#app')
