import * as types from "../mutation-types";
import { FirebaseService } from "@/services/firebase-service";
const state = {
    progressList: null
};
const mutations = {
    [types.SET_USER_PROGRESS_LIST](state, list) {
        state.progressList = list;
    }
};
const actions = {
    async getUserProgressList({ commit }, { userEmail, userGoal }) {
        try {
            const progressList = await FirebaseService.getUserProgressByGoal(userEmail, userGoal);
            commit(types.SET_USER_PROGRESS_LIST, progressList);
            return progressList;
        }
        catch (err) {
            commit(types.SET_USER_PROGRESS_LIST, null);
        }
    }
};
const getters = {
    progressList(state) {
        return state.progressList;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};
//# sourceMappingURL=user-progress.js.map