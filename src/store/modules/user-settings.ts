import * as types from '../mutation-types';
import { UserCredentials } from '@/models/user-credentials';
import { UserData } from '@/models/user-data';
import { FirebaseService } from '@/services/firebase-service';
import { UserSetupContent } from '@/models/user-setup-content';
import { UserSetupForm } from './data-types';

type UserSettingsState = {
    userData: UserData,
    userSetupContent: UserSetupContent | null
};

const state: UserSettingsState = {
    userData: new UserData(),
    userSetupContent: null
};

const mutations = {
    [types.SET_USER_SETUP_CONTENT](state: UserSettingsState, setupContent: UserSetupContent) {
        state.userSetupContent = setupContent;
    }
};

const actions = {
    async saveUserDetails({ commit, dispatch, rootState }: any, { stats, goal, activityLevel }: UserSetupForm) {
        try {
            const userContent = UserSetupContent.createFromSetupForm({
                stats, goal, activityLevel
            });
            const result = await FirebaseService.saveUserDetails(userContent, rootState.auth.user.email);
            commit(types.SET_USER_SETUP_CONTENT, result);
            return result;
        } catch (err) {
            dispatch('propagateError', err);
        }
    },
    async getUserDetails({ commit, dispatch }: any, userEmail: string) {
        try {
            const userDetails = await FirebaseService.getUserDetails(userEmail);
            commit(types.SET_USER_SETUP_CONTENT, userDetails);
        } catch (err) {
            dispatch('propagateError', err);
        }
    }
};

const getters = {
    userData(state: UserSettingsState): UserData {
        return state.userData;
    },
    userSetupContent(state: UserSettingsState): UserSetupContent {
        return <UserSetupContent>state.userSetupContent;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
