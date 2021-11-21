<template>
  <v-app style="background-color: #F2F7FF">
    <v-app-bar v-if="userLoggedIn" app dense color="primary" dark clipped-left>
      <v-toolbar-title class="font-weight-bold d-flex flex-row align-center">
        <v-icon large>mdi-hospital-marker</v-icon>
        <div>Hospital CRM</div>
      </v-toolbar-title>
      <v-spacer />
      <div class="font-weight-medium">{{getUser.username}}</div>
    </v-app-bar>
    <v-main>
      <navigation-component v-if="userLoggedIn" />
      <v-container fluid class="fill-height">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import NavigationComponent from "./components/NavigationComponent";
import {mapGetters} from "vuex";
export default {
  name: "App",
  components: {NavigationComponent},
  computed: {
    ...mapGetters("configuration", {
      getUser: "getCurrentUser"
    }),
    userLoggedIn() {
      return !!this.getUser;
    },
  },
  created() {
    this.$store.dispatch('configuration/loadUserFromStorage');
    this.$store.dispatch('db/refreshDbs');
  },
};
</script>
