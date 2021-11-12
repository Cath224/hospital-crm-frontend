const state = {
  dbs: [],
};

const getters = {
  getDb: (state) => (id) => {
    for (let db of state.dbs) {
      if (db.id === id) {
        return db;
      }
    }
    return null;
  },
  getDbs: (state) => {
    return state.dbs;
  },
};

const actions = {
  refreshDbs({ commit, state }) {
    commit("setDbs", state.dbs);
  },
  createDb({ commit }, value) {
    commit("setDbs", [value]);
  },
};

const mutations = {
  setDbs(state, payload) {
    if (state.dbs) {
      for (let db of payload) {
        state.dbs.push(db);
      }
    } else {
      state.dbs = payload;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
