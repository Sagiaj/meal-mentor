import Vue from "vue";
import Router from "vue-router";
import firebase from 'firebase/app';
import 'firebase/auth';
import MainView from "./views/MainView.vue";
import AuthView from './views/AuthView.vue';
import store from './store/store';
import SetupView from './views/SetupView.vue';
import MealPlannerView from './views/MealPlannerView.vue';
Vue.use(Router);
const router = new Router({
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
            path: '/meal',
            name: 'MealPlannerView',
            component: MealPlannerView,
            meta: {
                requiresSetup: true
            }
        }
    ]
});
let time = +new Date();
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
            console.log('here in userSetupContent:', userSetupContent);
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
//# sourceMappingURL=router.js.map