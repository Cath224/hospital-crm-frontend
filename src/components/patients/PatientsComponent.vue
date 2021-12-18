<template>
  <div class="d-flex flex-row fill-height flex-grow-1">
    <div class="d-flex flex-column fill-height flex-grow-1">
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
          >
            mdi-delete
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
  </div>
</template>

<script>
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";
import EntityDialog from "../common/EntityDialog";
import PatientFormComponent from "./PatientFormComponent";

export default {
  name: "PatientsComponent",
  components: {PatientFormComponent, EntityDialog},
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
    }
  },
}
</script>