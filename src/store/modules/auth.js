import * as types from "../mutation-types";
import { FirebaseService } from "@/services/firebase-service";
const state = {
    user: null,
    authStateFinished: false
};
const mutations = {
    [types.SET_USER](state, user) {
        state.user = user;
    },
    [types.SET_AUTH_STATE_FINISHED](state, isLoaded) {
        state.authStateFinished = isLoaded;
    }
};
const actions = {
    async setAuthStateFinished({ commit, dispatch }, isLoaded) {
        commit(types.SET_AUTH_STATE_FINISHED, isLoaded);
    },
    async verifyUser({ commit, dispatch }) {
        try {
            let user = await FirebaseService.verifyUser();
            commit(types.SET_USER, user);
            await dispatch("getUserDetails", user.email);
            return user;
        }
        catch (err) {
            dispatch("propagateError", err);
            return Promise.reject(err);
        }
    },
    async authUserLogin({ commit, dispatch }, { email, password }) {
        try {
            const user = await FirebaseService.signIn(email, password);
            commit(types.SET_USER, user);
            await dispatch("getUserDetails", email);
            return user;
        }
        catch (err) {
            dispatch("propagateError", err);
            return Promise.reject(err);
        }
    },
    async authUserRegister({ commit, dispatch }, { email, password, username }) {
        try {
            let user = await FirebaseService.signUp(email, password, username);
            commit(types.SET_USER, user);
            return actions.verifyUser({ commit, dispatch });
        }
        catch (err) {
            dispatch("propagateError", err);
            return Promise.reject(err);
        }
    },
    async authUserLogout({ commit, dispatch }) {
        try {
            await FirebaseService.signOut();
            dispatch("resetUserStates");
            commit(types.SET_USER, null);
            return true;
        }
        catch (err) {
            dispatch("propagateError", err);
            return Promise.reject(err);
        }
    },
    authAutoLogin({ commit, dispatch }, user) {
        try {
            if (user) {
                return actions.verifyUser({ commit, dispatch });
            }
            else {
                dispatch("propagateError", "No user was found");
                return null;
            }
        }
        catch (err) {
            dispatch("propagateError", err);
            throw new Error(err);
        }
    },
    resetUserStates({ commit, dispatch }) {
        try {
            commit(types.SET_USER, null);
            commit(types.SET_USER_SETUP_CONTENT, null);
        }
        catch (err) {
            dispatch("propagateError", err);
        }
    }
};
const getters = {
    user(state) {
        return state.user;
    },
    authStateFinished(state) {
        return state.authStateFinished;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
//# sourceMappingURL=auth.js.map