import VueRouter from "vue-router";
import Vue from "vue";
import Router from "vue-router";
import firebase from 'firebase/app';
import 'firebase/auth';
// import MainView from "./views/MainView.vue";
// import AuthView from './views/AuthView.vue';
// import SetupView from './views/SetupView.vue';
// import MealPlannerView from './views/MealPlannerView.vue';
import store from "../store";
Vue.use(Router);
const routes = [
    {
        path: "/",
        name: "MainView",
        component: () => import("@/views/MainView.vue"),
        meta: {
            requiresSetup: true
        }
    },
    {
        path: "/auth",
        name: "AuthView",
        component: () => import("@/views/AuthView.vue")
    },
    {
        path: "/setup",
        name: "SetupView",
        component: () => import("@/views/SetupView.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/meal",
        name: "MealPlannerView",
        component: () => import("@/views/MealPlannerView.vue"),
        meta: {
            requiresSetup: true
        }
    },
    {
        path: "/progress",
        name: "ProgressView",
        component: () => import("@/views/ProgressView.vue"),
        meta: {
            requiresSetup: true
        }
    }
];
const router = new VueRouter({
    routes
});
router.beforeEach(async (to, from, next) => {
    let { authStateFinished } = store.getters;
    if (!authStateFinished) {
        next();
        return;
    }
    let { currentUser } = await firebase.auth();
    let { userSetupContent } = store.getters;
    if (to.matched.some((record) => record.meta.requiresAuth && !currentUser)) {
        if (!currentUser) {
            next({
                path: '/auth'
            });
        }
        else {
            next();
        }
    }
    else {
        if (to.matched.some(record => record.meta.requiresSetup && !userSetupContent)) {
            console.log('here in userSetupContent:', userSetupContent, JSON.stringify(store.getters, null, 4));
            next({
                path: '/setup'
            });
        }
        else {
            next();
        }
    }
});
export default router;
//# sourceMappingURL=index.js.map