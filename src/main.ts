import Vue from "vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "./config/firebase/firebase";
import App from "./App.vue";
import { mapActions } from "vuex";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  methods: {
    ...mapActions(["setAuthStateFinished", "authAutoLogin"])
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        await this.authAutoLogin(user);
      }
      this.setAuthStateFinished(true);
    });
  },
  render: h => h(App)
}).$mount("#app");
