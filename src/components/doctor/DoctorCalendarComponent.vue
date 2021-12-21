<template>
  <div class="d-flex flex-row align-center justify-center">
    <v-card v-if="doctorId" height="45vh" width="60vw">
      <v-card-title>Patient Visit Calendar</v-card-title>
      <v-card-text>
        <div class="d-flex flex-row align-center justify-center">
        <v-calendar :events="events">

        </v-calendar>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="d-flex flex-row align-center justify-end flex-grow-1">
          <v-btn class="mx-2" color="primary" text @click="$emit('closeCalendar')">Cancel</v-btn>
        </div>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";

export default {
  name: "DoctorCalendarComponent",
  props: {
    doctorId: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    events: [],
  }),
  watch: {
    doctorId: {
      handler() {
        this.loadEvents();
      },
      deep: true,
    }
  },
  mounted() {
    this.loadEvents();
  },
  methods: {
    loadEvents() {
      RepositoryFactory.get("PATIENT").get(null).then((response) => {
        let patients = response.data;
        RepositoryFactory.get("PATIENT_VISIT").get(`doctorId==${this.doctorId}`).then((responseVisit) => {
          let visits = responseVisit.data;
          let result = [];
          for (let visit of visits) {
            result.push({
              name: `${patients.filter((el) => el.id === visit.patientId)[0].firstName} ${patients.filter((el) => el.id === visit.patientId)[0].lastName}`,
              start: new Date(visit.planedTimestamp),
              end: new Date(new Date(visit.planedTimestamp).getTime() +  (60*60*1000)),
            })
          }
          this.events = result;
        })
      }).catch((error) => {
        EventBus.$emit("error", error);
      });
    }
  }
}
</script>