/*
 * @Author: hainan.dong 
 * @Date: 2020-07-12 17:41:12 
 * @Last Modified by: hainan.dong
 * @Last Modified time: 2020-07-13 15:37:49
 * 切换动画store
 */
import { Commit } from 'vuex';

interface State {
  TRANSITION_NAME: string,
  checked: boolean
}

const state: State = {
  TRANSITION_NAME: 'fade-left-transform',
  checked: true
}

const getters = {
  transitionName(state: State) {
    return state.TRANSITION_NAME
  }
}

const mutations = {
  changeTransFN(state: State, dir: string) {
    state.TRANSITION_NAME = `fade-${dir}-transform`
  },
}
const actions = {
  changeTransFN(context: { commit: Commit }, payload: object) {
    context.commit('saveMenuListFN', payload);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
