<template>
  <div class="d-flex flex-row fill-height flex-grow-1">
    <div class="d-flex flex-column fill-height flex-grow-1">
      <div class="text-h4 my-2 mx-4">Medications</div>
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
        <template v-slot:item.branchId="{ item }">
          <entity-table-field entity-store="branches" :entity-id-value="item.branchId"/>
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
              @click="deleteItem(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </div>
    <entity-dialog v-model="patientDialog" custom @close="cancelCreationPatient">
      <medicine-form-component v-if="patientDialog" :type="patientToChange != null ? 'edit' : 'create'"
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
import MedicineFormComponent from "./MedicineFormComponent";
import EntityTableField from "../common/EntityTableField";

export default {
  name: "MedicineComponent",
  components: {EntityTableField, MedicineFormComponent, EntityDialog},
  data: () => ({
    search: null,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      {
        text: 'Serial Number',
        align: 'start',
        sortable: true,
        value: 'serialNumber',
      },
      {
        text: 'Branch',
        align: 'start',
        sortable: true,
        value: 'branchId',
      },
      {
        text: 'Description',
        align: 'start',
        sortable: true,
        value: 'description',
      },
      {
        text: 'Indications',
        align: 'start',
        sortable: true,
        value: 'indications',
      },
      {
        text: 'Contraindications',
        align: 'start',
        sortable: true,
        value: 'contraindications',
      },
      {
        text: 'Number',
        align: 'start',
        sortable: true,
        value: 'number',
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
      RepositoryFactory.get("MEDICINE").get(null).then((response) => {
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
      RepositoryFactory.get("MEDICINE").deleteById(id).then(() => {
        this.loadItems();
      }).catch((error) => {
        EventBus.$emit("error", error);
      })
    },
  },
}
</script>