import Vue from "vue";
import Vuex from "vuex";
import "../config/firebase";
// import { auth, globalError, userSettings } from "./modules";
import auth from "./modules/auth";
import globalError from "./modules/global-error";
import userSettings from "./modules/user-settings";
import userProgress from "./modules/user-progress";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    globalError,
    userSettings,
    userProgress
  }
});
