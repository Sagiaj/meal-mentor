import Vue from "vue";
import App from "./App.vue";
import './plugins/vuetify';
import router from "./router";
import store from "./store/store";
import firebase from './config/firebase/firebase';
import { mapActions, mapGetters } from 'vuex';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  methods: {
    ...mapActions([
      'setAuthStateFinished',
      'authAutoLogin',
      'getUserDetails'
    ])
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        await this.authAutoLogin(user);
      }
      this.setAuthStateFinished(true);
    })
  },
  render: h => h(App)
}).$mount("#app");
