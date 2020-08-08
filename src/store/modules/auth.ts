import * as types from "../mutation-types";
import { FirebaseService } from "@/services/firebase-service";
import { FirebaseUser } from "@/models/firebase-user";
import { UserCredentials } from "@/models/user-credentials";

type authState = {
  user: UserCredentials | null;
  authStateFinished: boolean;
};

const state: authState = {
  user: null,
  authStateFinished: false
};

const mutations = {
  [types.SET_USER](state: authState, user: UserCredentials) {
    state.user = user;
  },
  [types.SET_AUTH_STATE_FINISHED](state: authState, isLoaded: boolean) {
    state.authStateFinished = isLoaded;
  }
};

const actions = {
  async setAuthStateFinished({ commit, dispatch }: any, isLoaded: boolean) {
    commit(types.SET_AUTH_STATE_FINISHED, isLoaded);
  },
  async verifyUser({ commit, dispatch }: any): Promise<any> {
    try {
      let user: UserCredentials = await FirebaseService.verifyUser();
      commit(types.SET_USER, user);
      await dispatch("getUserDetails", user.email);
      return user;
    } catch (err) {
      dispatch("propagateError", err);
      return Promise.reject(err);
    }
  },
  async authUserLogin(
    { commit, dispatch }: any,
    { email, password }: UserCredentials
  ): Promise<FirebaseUser> {
    try {
      const user: FirebaseUser = await FirebaseService.signIn(email, password);
      commit(types.SET_USER, user);
      await dispatch("getUserDetails", email);
      return user;
    } catch (err) {
      dispatch("propagateError", err);
      return Promise.reject(err);
    }
  },
  async authUserRegister(
    { commit, dispatch }: any,
    { email, password, username }: UserCredentials
  ): Promise<FirebaseUser> {
    try {
      let user: FirebaseUser = await FirebaseService.signUp(
        email,
        password,
        username
      );
      commit(types.SET_USER, user);
      return actions.verifyUser({ commit, dispatch });
    } catch (err) {
      dispatch("propagateError", err);
      return Promise.reject(err);
    }
  },
  async authUserLogout({ commit, dispatch }: any) {
    try {
      await FirebaseService.signOut();
      dispatch("resetUserStates");
      commit(types.SET_USER, null);
      return true;
    } catch (err) {
      dispatch("propagateError", err);
      return Promise.reject(err);
    }
  },
  authAutoLogin({ commit, dispatch }: any, user: FirebaseUser) {
    try {
      if (user) {
        return actions.verifyUser({ commit, dispatch });
      } else {
        dispatch("propagateError", "No user was found");
        return null;
      }
    } catch (err) {
      dispatch("propagateError", err);
      throw new Error(err);
    }
  },
  resetUserStates({ commit, dispatch }: any) {
    try {
      commit(types.SET_USER, null);
      commit(types.SET_USER_SETUP_CONTENT, null);
    } catch (err) {
      dispatch("propagateError", err);
    }
  }
};

const getters = {
  user(state: authState) {
    return state.user;
  },
  authStateFinished(state: authState) {
    return state.authStateFinished;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
