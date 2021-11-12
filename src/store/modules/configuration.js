const state = {
  selectedDb: null,
};

const getters = {
  getSelectedDb: (state) => {
    return state.selectedDb;
  },
};

const actions = {
  selectDb({ commit }, value) {
    commit("setSelectedDb", value);
  },
};

const mutations = {
  setSelectedDb(state, payload) {
    state.selectedDb = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
