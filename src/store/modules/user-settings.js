import * as types from '../mutation-types';
import { UserData } from '@/models/user-data';
import { FirebaseService } from '@/services/firebase-service';
import { UserSetupContent } from '@/models/user-setup-content';
const state = {
    userData: new UserData(),
    userSetupContent: null
};
const mutations = {
    [types.SET_USER_SETUP_CONTENT](state, setupContent) {
        state.userSetupContent = setupContent;
    }
};
const actions = {
    async saveUserDetails({ commit, dispatch, rootState }, { stats, goal, activityLevel }) {
        try {
            const userContent = UserSetupContent.createFromSetupForm({
                stats, goal, activityLevel
            });
            const result = await FirebaseService.saveUserDetails(userContent, rootState.auth.user.email);
            commit(types.SET_USER_SETUP_CONTENT, result);
            return result;
        }
        catch (err) {
            dispatch('propagateError', err);
        }
    },
    async getUserDetails({ commit, dispatch }, userEmail) {
        try {
            const userDetails = await FirebaseService.getUserDetails(userEmail);
            commit(types.SET_USER_SETUP_CONTENT, userDetails);
        }
        catch (err) {
            dispatch('propagateError', err);
        }
    }
};
const getters = {
    userData(state) {
        return state.userData;
    },
    userSetupContent(state) {
        return state.userSetupContent;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
//# sourceMappingURL=user-settings.js.map