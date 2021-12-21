<template>
  <div class="d-flex flex-row fill-height flex-grow-1">
    <div class="d-flex flex-column fill-height flex-grow-1">
      <div class="text-h4 my-2 mx-4">Doctors</div>
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
        <template v-slot:item.officeId="{ item }">
          <entity-table-field entity-store="offices" :entity-id-value="item.officeId"/>
        </template>
        <template v-slot:item.branches="{ item }">
          <div v-if="getDoctorBranches(item.id)" class="d-flex flex-column">
            <div v-for="branch of getDoctorBranches(item.id)" :key="branch.id">
              <v-tooltip left color="primary">
                <template v-slot:activator="{ on }">
                 <div v-on="on">
                   {{ branch.name }}
                 </div>
                </template>
                <div class="d-flex flex-column col-auto align-self-auto">
                  <p>Years of Experience: {{branch.experience}}</p>
                  <p>Number of patients: {{branch.numberOfPatients}}</p>
                </div>
              </v-tooltip>
            </div>
          </div>
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
              @click="openCalendar(item.id)"
          >
            mdi-calendar
          </v-icon>
        </template>
      </v-data-table>
    </div>
    <entity-dialog v-model="patientDialog" custom @close="cancelCreationPatient">
      <doctor-form-component v-if="patientDialog" :type="patientToChange != null ? 'edit' : 'create'"
                             :input-entity="patientToChange"
                             @entityChanged="patientChanged"
                             @cancelCreation="cancelCreationPatient"/>
    </entity-dialog>
    <entity-dialog v-model="calendarDialog" custom @close="closeCalendar">
      <doctor-calendar-component v-if="calendarDialog" :doctorId="calendarDoctorId" @closeCalendar="closeCalendar" />
    </entity-dialog>
  </div>
</template>

<script>
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";
import DoctorFormComponent from "./DoctorFormComponent";
import EntityDialog from "../common/EntityDialog";
import EntityTableField from "../common/EntityTableField";
import {mapGetters} from "vuex";
import DoctorCalendarComponent from "./DoctorCalendarComponent";

export default {
  name: "DoctorsComponent",
  components: {DoctorCalendarComponent, EntityTableField, DoctorFormComponent, EntityDialog},
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
        text: 'Branches',
        align: 'start',
        sortable: true,
        value: 'branches',
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
      {
        text: 'Office',
        align: 'start',
        sortable: true,
        value: 'officeId',
      },
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    items: [],
    loading: false,
    patientDialog: false,
    calendarDialog: false,
    calendarDoctorId: null,
    patientToChange: null,
    branchesExp: {},
  }),
  computed: {
    ...mapGetters('content', {
      getBranches: 'getBranches'
    }),
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    loadItems() {
      this.loading = true;
      RepositoryFactory.get("DOCTOR").get(null).then((response) => {
        let expBranches = this.getExpBranches();
        expBranches.then((result) => {
          this.branchesExp = result;
          this.items = response.data;
          this.$forceUpdate();
        })
      }).catch((error) => {
        EventBus.$emit("error", error);
      })
          .finally(() => {
            this.loading = false
          })
    },
    getExpBranches() {
      return RepositoryFactory.get("DOCTOR_EXPERIENCE").get(null).then((response) => {
        let date = new Date().getFullYear();
        let result = {};
        let experiences = response.data;
        let branches = this.getBranches;
        for (let experience of experiences) {
          if (!result[experience.doctorId]) {
            result[experience.doctorId] = [];
          }
          for (let branch of branches) {
            if (branch.id === experience.branchId) {
              let branchExp = {
                id: branch.id,
                name: branch.name,
                numberOfPatients: experience.numberOfPatients,
              };
              if (experience.startPracticingDate) {
                let year = date - new Date(experience.startPracticingDate).getFullYear();
                branchExp.experience = year ? year : 1;
              } else {
                branchExp.experience = 1;
              }
              result[experience.doctorId].push(branchExp);
              break;
            }
          }
        }
        return result;
      }).catch((error) => {
        EventBus.$emit("error", error);
      })
    },
    getDoctorBranches(id) {
      return this.branchesExp != null ? this.branchesExp[id] : [];
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
      RepositoryFactory.get("DOCTOR").deleteById(id).then(() => {
        this.loadItems();
      }).catch((error) => {
        EventBus.$emit("error", error);
      })
    },
    openCalendar(doctorId) {
      this.calendarDoctorId = doctorId;
      this.calendarDialog = true;
    },
    closeCalendar() {
      this.calendarDialog = false;
    }
  },
}
</script>