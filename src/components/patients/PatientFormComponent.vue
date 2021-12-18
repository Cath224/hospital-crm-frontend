<template>
  <v-card :loading="loading">
    <v-card-title>Create Patient</v-card-title>
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
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="d-flex flex-row align-center justify-end flex-grow-1">
        <v-btn class="mx-2" color="primary" text @click="cancelCreatePatient">Cancel</v-btn>
        <v-btn class="mx-2" color="primary" @click="changePatient">{{type === 'create' ? 'Create' : 'Edit'}}</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as deepcopy from 'deepcopy';
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";

export default {
  name: "PatientFormComponent",
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
  }),
  mounted() {
    this.entity = this.type === "create" ? {} : deepcopy(this.inputEntity)
  },
  methods: {
    changePatient() {
      this.loading = true;
      if (this.type === 'create') {
        RepositoryFactory.get("PATIENT").create(this.entity).then((response) => {
          this.$emit("entityChanged", response.data);
          this.cancelCreatePatient();
        }).catch((error) => {
          EventBus.$emit("error", error);
        }).finally(() => {
          this.loading = false
        })
      } else {
        RepositoryFactory.get("PATIENT").update(this.entity, this.entity.id).then((response) => {
          this.$emit("entityChanged", response.data);
          this.cancelCreatePatient();
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