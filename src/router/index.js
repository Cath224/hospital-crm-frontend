import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "Home",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    props: true,
    component: () => import("../views/user/UserLoginPage"),
  },
  {
    path: "/patients",
    name: "Patients",
    component: () => import("../views/patients/PatientsView"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["configuration/getCurrentUser"] == null) {
      next({ name: "Login", query: { page: to.name } });
    } else {
      next();
    }
  } else if (to.name === "Login") {
    if (store.getters["configuration/getCurrentUser"] == null) {
      next();
    } else {
      let page = to.query.page;
      if (!page) {
        page = "Home";
      }
      next({ name: page });
    }
  } else {
    next();
  }
});

export default router;
