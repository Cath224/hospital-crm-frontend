<template>
  <v-card :loading="loading">
    <v-card-title>{{ type === 'create' ? 'Create' : 'Edit' }} Doctor</v-card-title>
    <v-card-text>
      <v-form v-if="!!entity">
        <v-row align="center">
          <v-col align-self="center" cols="5">
            <v-text-field v-model="entity.firstName" label="First Name"/>
          </v-col>
          <v-col align-self="center" cols="5">
            <v-text-field v-model="entity.lastName" label="Last Name"/>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col align-self="center" cols="5">
            <v-menu
                v-model="birthdayMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="entity.birthday"
                    label="Birthday"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                />
              </template>
              <v-date-picker
                  v-model="entity.birthday"
                  @input="birthdayMenu = false"
              />
            </v-menu>
          </v-col>
          <v-col align-self="center" cols="5">
            <v-text-field v-model="entity.phone" type="number" label="Phone"/>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col align-self="center" cols="5">
            <v-select v-model="entity.sex" label="Sex" :items="['M', 'F']"/>
          </v-col>
          <v-col align-self="center" cols="5">
            <entity-autocomplete-field v-model="entity.officeId" item-text="name" label="Office"
                                       items-repository-name="OFFICE"/>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col align-self="center" cols="10">
            <entity-autocomplete-field ref="branches" v-model="entity.branches"  label="Branches" multi item-text="name" items-store-name="branches" />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="d-flex flex-row align-center justify-end flex-grow-1">
        <v-btn class="mx-2" color="primary" text @click="cancelCreatePatient">Cancel</v-btn>
        <v-btn class="mx-2" color="primary" @click="changePatient">{{ type === 'create' ? 'Create' : 'Edit' }}</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as deepcopy from "deepcopy";
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";
import EntityAutocompleteField from "../common/EntityAutocompleteField";

export default {
  name: "DoctorFormComponent",
  components: {EntityAutocompleteField},
  props: {
    type: {
      type: String,
      default: "create",
    },
    inputEntity: {
      type: Object,
    }
  },
  data: () => ({
    entity: null,
    birthdayMenu: false,
    loading: false,
    branches: []
  }),
  mounted() {
    this.entity = this.type === "create" ? {} : deepcopy(this.inputEntity);

    if (this.type === 'edit') {
     RepositoryFactory.get("DOCTOR_EXPERIENCE").get(`doctorId==${this.entity.id}`).then((response) => {
       this.entity.branches = response.data.map((el) => el.branchId);
       this.branches = deepcopy(this.entity.branches);
       this.$refs.branches.setValue(this.entity.branches);
       this.$refs.branches.$forceUpdate();
      })
    }
  },
  methods: {
    changePatient() {
      this.loading = true;
      let entityToChange = deepcopy(this.entity);
      delete entityToChange.branches
      if (this.type === 'create') {
        RepositoryFactory.get("DOCTOR").create(entityToChange).then((response) => {
          console.log(this.entity)
          let branches = this.entity.branches;
          if (!branches || !branches.length) {
            this.$emit("entityChanged", response.data);
            this.cancelCreatePatient();
            return;
          }

          let experiences = [];
          for (let branch of branches) {
            let doctorExperience = {
              doctorId: response.data.id,
              branchId: branch,
              startPracticingDate: new Date()
            };
            experiences.push(RepositoryFactory.get("DOCTOR_EXPERIENCE").create(doctorExperience));
          }

          Promise.all(experiences)
              .then(() => {
                this.$emit("entityChanged", response.data);
                this.cancelCreatePatient();
              })
          .catch((error) => {
            EventBus.$emit("error", error);
          })

        }).catch((error) => {
          EventBus.$emit("error", error);
        }).finally(() => {
          this.loading = false
        })
      } else {
        RepositoryFactory.get("DOCTOR").update(entityToChange, entityToChange.id).then((response) => {
          let branches = this.entity.branches;
          if (!branches) {
            this.$emit("entityChanged", response.data);
            this.cancelCreatePatient();
            return;
          }

          let experiences = [];
          for (let branch of branches) {
            if (!this.branches.includes(branch)) {
              let doctorExperience = {
                doctorId: this.entity.id,
                branchId: branch,
                startPracticingDate: new Date()
              };
              experiences.push(RepositoryFactory.get("DOCTOR_EXPERIENCE").create(doctorExperience));
            }
          }

          for (let branch of this.branches) {
            if (!branches.includes(branch)) {
              experiences.push(RepositoryFactory.get("DOCTOR_EXPERIENCE").deleteByFilter(`doctorId==${this.entity.id};branchId==${branch}`));
            }
          }

          Promise.all(experiences)
              .then(() => {
                this.$emit("entityChanged", response.data);
                this.cancelCreatePatient();
              })
              .catch((error) => {
                EventBus.$emit("error", error);
              })
        }).catch((error) => {
          EventBus.$emit("error", error);
        }).finally(() => {
          this.loading = false
        })
      }



    },
    cancelCreatePatient() {
      this.$emit("cancelCreation");
    }
  }
}
</script>