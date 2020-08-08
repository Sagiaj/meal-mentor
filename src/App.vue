<template>
  <v-app>
    <!-- <v-app-bar app color="primary"> -->
    <!-- <v-toolbar-title>
        <v-avatar size="50px">
          <img src="./assets/logo.png" alt="alt" @click="goToHome" />
        </v-avatar>
        <Navbar />
      </v-toolbar-title> -->
    <!-- <v-spacer></v-spacer>
    </v-app-bar> -->
    <Navbar />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view v-if="authStateFinished" />
        <AuthLoader v-else />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import AuthLoader from "@/components/auth/AuthLoader.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { Navbar, AuthLoader },
  computed: {
    ...mapGetters(["authStateFinished"])
  },
  methods: {
    goToHome() {
      this.$router.push({
        path: "/"
      });
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.maximal-view {
  height: 80vh;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
