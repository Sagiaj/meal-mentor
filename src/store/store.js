import Vue from "vue";
import Vuex from "vuex";
import '../config/firebase/index';
import auth from "./modules/auth";
import globalError from './modules/global-error';
import userSettings from './modules/user-settings';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        auth,
        userSettings,
        globalError
    }
});
//# sourceMappingURL=store.js.map