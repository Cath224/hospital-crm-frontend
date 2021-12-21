<template>
  <div class="d-flex flex-row align-center">
    <v-menu close-on-content-click>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="font-weight-medium"
            v-bind="attrs"
            v-on="on"
        >
          {{ `${getSelectedDoctor.firstName} ${getSelectedDoctor.lastName}` }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="doctor of doctors"
            :key="doctor.id"
            @click="selectDoctor(doctor)"
        >
          <v-list-item-title>{{ `${doctor.firstName} ${doctor.lastName}` }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";

export default {
  name: "DoctorMenuComponent",
  computed: {
    ...mapGetters("configuration", {
      getSelectedDoctor: "getSelectedDoctor"
    }),
  },
  data: () => ({
    doctors: [],
  }),
  watch: {
    getSelectedDoctor: {
      handler() {
        this.loadDoctors();
      },
      deep: true,
    }
  },
  mounted() {
    this.loadDoctors();
  },
  methods: {
    loadDoctors() {
      RepositoryFactory.get("DOCTOR").get(null).then((response) => {
        this.doctors = response.data;
      })
          .catch((error) => {
            EventBus.$emit("error", error);
          })
    },
    selectDoctor(doctor) {
      this.$store.dispatch("configuration/selectDoctor", doctor);
    }
  }
}
</script>