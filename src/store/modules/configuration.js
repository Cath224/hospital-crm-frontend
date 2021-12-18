import LocalStorage from "../localStorage";

const state = {
  selectedDoctor: null,
};

const getters = {
  getSelectedDoctor: (state) => {
    let doctor = state.selectedDoctor;
    if (!doctor) {
      doctor = LocalStorage.getItem("doctor");
    }
    return doctor;
  },
};

const actions = {
  selectDoctor({ commit }, value) {
    commit("setDoctor", LocalStorage.saveItem("doctor", value));
  },
  loadDoctorFromStorage({ commit }) {
    commit("setDoctor", LocalStorage.getItem("doctor"));
  },
};

const mutations = {
  setDoctor(state, payload) {
    state.selectedDoctor = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
