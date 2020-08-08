import Vue from "vue";
import store from "@/store/index";
import VueRouter, { RouteRecord } from "vue-router";
import "firebase/auth";
import firebase from "firebase/app";
import MainView from "@/views/MainView.vue";
import AuthView from "@/views/AuthView.vue";
import SetupView from "@/views/SetupView.vue";
import MealPlannerView from "@/views/MealPlannerView.vue";
import ProgressView from "@/views/ProgressView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "MainView",
      component: MainView,
      meta: {
        requiresSetup: true
      }
    },
    {
      path: "/auth",
      name: "AuthView",
      component: AuthView
    },
    {
      path: "/setup",
      name: "SetupView",
      component: SetupView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/meal",
      name: "MealPlannerView",
      component: MealPlannerView,
      meta: {
        requiresSetup: true
      }
    },
    {
      path: "/progress",
      name: "ProgressView",
      component: ProgressView,
      meta: {
        requiresSetup: true
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  let { authStateFinished } = store.getters;
  if (!authStateFinished) {
    next();
    return;
  }
  let { currentUser } = await firebase.auth();
  let { userSetupContent } = store.getters;
  if (
    to.matched.some(
      (record: RouteRecord) => record.meta.requiresAuth && !currentUser
    )
  ) {
    if (!currentUser) {
      next({
        path: "/auth"
      });
    } else {
      next();
    }
  } else {
    if (
      to.matched.some(
        (record: RouteRecord) => record.meta.requiresSetup && !userSetupContent
      )
    ) {
      next({
        path: "/setup"
      });
    } else {
      next();
    }
  }
});

export default router;
