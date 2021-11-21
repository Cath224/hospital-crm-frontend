import LocalStorage from "../localStorage";

const state = {
  user: null,
  selectedDb: null,
};

const getters = {
  getCurrentUser: (state) => {
    let user = state.user;
    if (!user) {
      user = LocalStorage.getItem("user");
    }
    return user;
  },
  getSelectedDb: (state) => {
    return state.selectedDb;
  },
};

const actions = {
  selectDb({ commit }, value) {
    commit("setSelectedDb", value);
  },
  selectUser({ commit }, value) {
    commit("setUser", LocalStorage.saveItem("user", value));
  },
  loadUserFromStorage({ commit }) {
    commit("setUser", LocalStorage.getItem("user"));
  },
};

const mutations = {
  setSelectedDb(state, payload) {
    state.selectedDb = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
