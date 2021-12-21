import { RepositoryFactory } from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";

const state = {
  branches: [],
  offices: [],
};

const getters = {
  getContents: (state) => (contentName) => {
    return state[contentName];
  },
  getContentById: (state) => (contentName, id) => {
    let contents = state[contentName];
    for (let content of contents) {
      if (content.id === id) {
        return content;
      }
    }
    return null;
  },
  getBranches: (state) => {
    return state.branches;
  },
  getBranchById: (state) => (id) => {
    let branches = state.branches;
    for (let branch of branches) {
      if (branch.id === id) {
        return branch;
      }
    }
    return null;
  },
  getOffices: (state) => {
    return state.offices;
  },
  getOfficeById: (state) => (id) => {
    let offices = state.offices;
    for (let office of offices) {
      if (office.id === id) {
        return office;
      }
    }
    return null;
  },
};

const actions = {
  refreshBranches: ({ commit }) => {
    RepositoryFactory.get("BRANCH")
      .get(null)
      .then((response) => {
        commit("setBranches", response.data);
      })
      .catch((error) => {
        EventBus.$emit("error", error);
      });
  },
  refreshOffices: ({ commit }) => {
    RepositoryFactory.get("OFFICE")
      .get(null)
      .then((response) => {
        commit("setOffices", response.data);
      })
      .catch((error) => {
        EventBus.$emit("error", error);
      });
  },
};

const mutations = {
  setOffices: (state, payload) => {
    state.offices = payload;
  },
  setBranches: (state, payload) => {
    state.branches = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
