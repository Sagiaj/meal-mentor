<template>
  <v-card flat>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
      color="primary"
      v-if="user && $vuetify.breakpoint.mdAndUp"
    >
      <v-list-item class="px-2">
        <router-link to="">
          <v-list-item-avatar @click.native="!mini ? goTo('/') : null">
            <v-img src="../assets/logo.png" v-if="!mini"></v-img>
            <v-btn fab text icon v-else>
              <v-icon color="secondary">mdi-menu</v-icon>
            </v-btn>
          </v-list-item-avatar>
        </router-link>
        <v-list-item-title>Meal Mentor</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          @click.native="item.action"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-card v-if="user && !$vuetify.breakpoint.mdAndUp">
      <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click.native="drawer = true"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" temporary app color="primary">
        <v-list-item class="px-2">
          <v-list-item-avatar @click="goTo('/')">
            <v-img src="../assets/logo.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>Meal Mentor</v-list-item-title>
          <v-btn icon @click.stop="drawer = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
            v-for="item in navItems"
            :key="item.title"
            @click.native="item.action"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  components: {},
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["authUserLogout"]),
    goTo(route) {
      if (route !== this.$route.fullPath) {
        switch(route) {
          case "/":
            return this.goToHome();
          case "/progress":
            return this.goToTimeLine();
          default:
            break;
        }
      }
    },
    goToAuthView() {
      this.$router.push({
        path: "/auth"
      });
    },
    goToHome() {
      this.$router.push({
        path: "/"
      })
    },
    goToSetupView() {
      this.$router.push({
        path: "/setup"
      });
    },
    goToTimeLine() {
      this.$router.push({
        path: "/progress"
      })
    },
    logout() {
      this.authUserLogout().then(res => {
        this.goToAuthView();
      });
    }
  },
  data() {
    return {
      drawer: false,
      mini: false,
      navItems: [
        {
          icon: "mdi-trending-up",
          title: "View your progress",
          action: () => this.goTo("/progress")
        },
        {
          icon: "logout",
          title: "Sign out",
          action: this.logout
        }
      ]
    };
  }
};
</script>
