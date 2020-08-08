<template>
  <v-app v-if="authStateFinished" style="background-color: var(--v-background-base);">
    <Navbar />
    <v-container grid-list-lg>
      <v-main>
        <transition name="fade" mode="out-in">
          <router-view class="maximal-view"/>
        </transition>
      </v-main>
      <ErrorPopup />
    </v-container>
  </v-app>
  <v-app light v-else>
    <v-container grid-list-xs>
      <AuthLoader />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';
import AuthLoader from '@/components/auth/AuthLoader.vue';
import { mapGetters } from 'vuex';
import ErrorPopup from "@/components/reuse/ErrorPopup.vue";

export default Vue.extend({
  name: 'App',
  components: {
    Navbar,
    AuthLoader,
    ErrorPopup
  },
  computed: {
    ...mapGetters([
      'authStateFinished'
    ])
  },
  data: () => ({
    
  }),
});
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
  opacity: 0
}
</style>
