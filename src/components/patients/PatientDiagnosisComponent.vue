<template>
  <div class="d-flex flex-row align-center justify-center">
    <v-card height="80vh" width="90vw" class="d-flex flex-column">
      <v-card-text>
        <v-card v-for="diagnosis of diagnoses" :key="diagnosis.id" flat outlined rounded>
          <v-card-title>{{ diagnosis.date }}</v-card-title>
          <v-card-text>
            <div>{{ diagnosis.description }}</div>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-spacer></v-spacer>
      <v-card-actions >
        <div class="d-flex flex-row align-center justify-end flex-grow-1">
          <v-btn class="mx-2" color="primary" @click="loadDiagnosis">Reload</v-btn>
          <v-btn class="mx-2" color="primary" text @click="$emit('closeDiagnosis')">Cancel</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";

export default {
  name: "PatientDiagnosisComponent",
  props: {
    patientId: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    diagnoses: [],
  }),
  watch: {
    patientId: {
      handler() {
        this.loadDiagnosis();
      },
      deep: true,
    }
  },
  mounted() {
    this.loadDiagnosis();
  },
  methods: {
    loadDiagnosis() {
      RepositoryFactory.get('PATIENT_VISIT').get(`patientId==${this.patientId}`).then((response) => {
        let visits = response.data;
        let result = [];
        for (let visit of visits) {
          RepositoryFactory.get('DIAGNOSIS').get(`patientVisitId==${visit.id}`).then((responseDiagnoses) => {
            let diagnoses = responseDiagnoses.data;
            for (let diagnosis of diagnoses) {
              result.push({
                id: diagnosis.id,
                date: new Date(visit.actualTimestamp),
                description: diagnosis.description,
              })
            }
          }).catch((error) => {
            EventBus.$emit('error', error);
          })
        }
        this.diagnoses = result;
      }).catch((error) => {
        EventBus.$emit('error', error);
      })
    }
  }
}
</script>