import Vue from "vue";
import Vuex from "vuex";
import db from "./modules/db";
import configuration from "./modules/configuration";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    configuration,
    db,
  },
});
