<template>
  <v-app style="background-color: #F2F7FF">
    <v-app-bar v-if="doctorSelected" app dense color="primary" dark clipped-left>
      <v-toolbar-title class="font-weight-bold d-flex flex-row align-center">
        <v-icon large>mdi-hospital-marker</v-icon>
        <div>Hospital CRM</div>
      </v-toolbar-title>
      <v-spacer />
      <div class="font-weight-medium">{{`${getSelectedDoctor.firstName} ${getSelectedDoctor.lastName}`}}</div>
    </v-app-bar>
    <v-main>
      <navigation-component v-if="doctorSelected" />
      <v-container fluid  class="fill-height">
        <router-view/>
      </v-container>
      <v-snackbar
          v-if="errorMessage"
          v-model="errorBar"
          multi-line
          timeout="1000"
      >
        {{errorMessage}}
        <template v-slot:action="{ attrs }">
          <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="errorBar = false"
          >
            Ok
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>

import NavigationComponent from "./components/NavigationComponent";
import {mapGetters} from "vuex";
import EventBus from "./plugins/event-bus";
export default {
  name: "App",
  components: {NavigationComponent},
  data: () => ({
    errorBar: false,
    errorMessage: null,
  }),
  computed: {
    ...mapGetters("configuration", {
      getSelectedDoctor: "getSelectedDoctor"
    }),
    doctorSelected() {
      return !!this.getSelectedDoctor;
    },
  },
  created() {
    this.$store.dispatch("configuration/loadDoctorFromStorage")
    EventBus.$on("error", (error) => {
      this.errorMessage = error;
      this.errorBar = true;
    });
  },
};
</script>
