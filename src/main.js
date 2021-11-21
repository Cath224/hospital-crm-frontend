import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

store.subscribe((mutation, state) => {
  if (mutation?.type === "configuration/setUser") {
    if (state.configuration.user == null) {
      router.push({ name: "Login" });
    } else {
      if (router.currentRoute.name === "Login") {
        let page = router.currentRoute.query.page;
        if (!page) {
          page = "Home";
        }
        router.push({ name: page });
      }
    }
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
