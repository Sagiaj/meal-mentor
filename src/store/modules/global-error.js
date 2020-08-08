import * as types from '../mutation-types';
const state = {
    currentError: {
        error: null
    }
};
const mutations = {
    [types.SET_CURRENT_ERROR](state, error) {
        state.currentError.error = error;
    }
};
const actions = {
    propagateError({ commit }, error) {
        commit(types.SET_CURRENT_ERROR, error);
    }
};
const getters = {
    currentError(state) {
        return state.currentError;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
//# sourceMappingURL=global-error.js.map