<template>
  <div class="d-flex flex-row fill-height flex-grow-1">
    <div class="d-flex flex-column fill-height flex-grow-1">
      <div class="text-h4 my-2 mx-4">Dashboard</div>
      <v-card class="fill-height" height="80vh"
              width="80vw">
        <v-card-title>Patients Statistics by month</v-card-title>
        <v-card-text>
          <v-sparkline
              fill
              :gradient="['#00c6ff', '#F0F', '#FF0']"
              :smooth="10"
              :value="patientsStatistics"
              :labels="labels"
              show-labels
              auto-draw>
          </v-sparkline>
        </v-card-text>
      </v-card>

    </div>
  </div>
</template>

<script>


import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";
import {mapGetters} from "vuex";

export default {
  name: "DashboardComponent",
  data: () => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    patientsStatistics: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }),
  computed: {
    ...mapGetters('configuration', {
      getSelectedDoctor: 'getSelectedDoctor',
    }),
  },
  mounted() {
    this.loadStatistics();
  },
  methods: {
    loadStatistics() {
      RepositoryFactory.get("PATIENT_VISIT").getStatistics(this.getSelectedDoctor?.id).then((response) => {
        let statistics = response.data;
        for (let data of statistics) {
          this.patientsStatistics[data.month - 1] = data.numberOfPatients;
        }
      }).catch((error) => {
        EventBus.$emit("error", error);
      });
    }
  },
}
</script>