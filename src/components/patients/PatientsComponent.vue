<template>
  <div class="d-flex flex-row fill-height flex-grow-1">
    <div class="d-flex flex-column fill-height flex-grow-1">
      <div class="text-h4 my-2 mx-4">Patients</div>
      <v-data-table class="ma-4 pa-4" height="60vh" :headers="headers" :items="items" :loading="loading"
                    :search="search">
        <template v-slot:top>
          <v-row justify="space-between">
            <v-col align-self="center" class="ma-2" cols="auto">
              <v-btn color="primary" @click="patientDialog = true">Add</v-btn>
            </v-col>
            <v-col align-self="center" class="ma-2" cols="5">
              <v-text-field
                  v-model="search"
                  label="Search"
              />
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editPatient(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              class="mr-2"
              @click="deleteItem(item.id)"
          >
            mdi-delete
          </v-icon>
          <v-icon
              small
              @click="showDiagnoses(item.id)"
          >
            mdi-order-bool-ascending
          </v-icon>
        </template>
      </v-data-table>
    </div>
    <entity-dialog v-model="patientDialog" custom @close="cancelCreationPatient">
      <patient-form-component v-if="patientDialog" :type="patientToChange != null ? 'edit' : 'create'"
                              :input-entity="patientToChange"
                              @entityChanged="patientChanged"
                              @cancelCreation="cancelCreationPatient"/>
    </entity-dialog>
    <entity-dialog v-model="diagnosesDialog" custom @close="closeDiagnoses">
      <patient-diagnosis-component v-if="!!diagnosesDialog && !!diagnosesPatientId" :patient-id="diagnosesPatientId" @closeDiagnosis="closeDiagnoses" />
    </entity-dialog>
  </div>
</template>

<script>
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";
import EntityDialog from "../common/EntityDialog";
import PatientFormComponent from "./PatientFormComponent";
import PatientDiagnosisComponent from "./PatientDiagnosisComponent";

export default {
  name: "PatientsComponent",
  components: {PatientDiagnosisComponent, PatientFormComponent, EntityDialog},
  data: () => ({
    search: null,
    headers: [
      {
        text: 'First Name',
        align: 'start',
        sortable: true,
        value: 'firstName',
      },
      {
        text: 'Last Name',
        align: 'start',
        sortable: true,
        value: 'lastName',
      },
      {
        text: 'Sex',
        align: 'start',
        sortable: true,
        value: 'sex',
      },
      {
        text: 'Birthday',
        align: 'start',
        sortable: true,
        value: 'birthday',
      },
      {
        text: 'Phone',
        align: 'start',
        sortable: true,
        value: 'phone',
      },
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    items: [],
    loading: false,
    patientDialog: false,
    diagnosesDialog: false,
    diagnosesPatientId: null,
    patientToChange: null,
  }),
  mounted() {
    this.loadItems()
  },
  methods: {
    loadItems() {
      this.loading = true;
      RepositoryFactory.get("PATIENT").get(null).then((response) => {
        this.items = response.data
      }).catch((error) => {
        EventBus.$emit("error", error);
      })
          .finally(() => {
            this.loading = false
          })
    },
    editPatient(item) {
      this.patientDialog = true;
      this.patientToChange = item;
    },
    patientChanged() {
      this.loadItems();
    },
    cancelCreationPatient() {
      this.patientDialog = false;
    },
    deleteItem(id){
      RepositoryFactory.get("PATIENT").deleteById(id).then(() => {
        this.loadItems();
      }).catch((error) => {
        EventBus.$emit("error", error);
      })
    },
    showDiagnoses(id) {
      this.diagnosesDialog = true;
      this.diagnosesPatientId = id;
    },
    closeDiagnoses() {
      this.diagnosesDialog = false;
      this.diagnosesPatientId = null;
    },
  },
}
</script>