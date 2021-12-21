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
              auto-draw>

          </v-sparkline>

        </v-card-text>
      </v-card>

    </div>
  </div>
</template>

<script>


export default {
  name: "DashboardComponent",
  data: () => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    patientsStatistics: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }),
  methods: {

  },
}
</script>