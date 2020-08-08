import * as types from "../mutation-types";
import { FirebaseService } from "@/services/firebase-service";
import { UserProgressTimeline } from "@/models/user-progress-timeline";

type UserProgressState = {
  progressList: UserProgressTimeline | null;
};

const state: UserProgressState = {
  progressList: null
};

const mutations = {
  [types.SET_USER_PROGRESS_LIST](state: UserProgressState, list: any) {
    state.progressList = list;
  }
};

const actions = {
  async getUserProgressList(
    { commit }: any,
    { userEmail, userGoal }: { userEmail: string; userGoal: string }
  ) {
    try {
      const progressList = await FirebaseService.getUserProgressByGoal(
        userEmail,
        userGoal
      );
      commit(types.SET_USER_PROGRESS_LIST, progressList);
      return progressList;
    } catch (err) {
      commit(types.SET_USER_PROGRESS_LIST, null);
    }
  }
};

const getters = {
  progressList(state: UserProgressState) {
    return state.progressList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
