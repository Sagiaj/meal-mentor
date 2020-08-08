import * as types from '../mutation-types';


type ErrorState = {
    currentError: {
        error: any
    };
};

const state: ErrorState = {
    currentError: {
        error: null
    }
};

const mutations = {
    [types.SET_CURRENT_ERROR](state: ErrorState, error: string) {
        state.currentError.error = error;
    }
};

const actions = {
    propagateError({ commit }: any, error: string) {
        commit(types.SET_CURRENT_ERROR, error);
    }
};

const getters = {
    currentError(state: ErrorState) {
        return state.currentError;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
