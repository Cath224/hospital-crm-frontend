<template>
  <v-card :loading="loading" >
    <v-card-title>{{type === 'create' ? 'Create' : 'Edit'}} Medication</v-card-title>
    <v-card-text>
      <v-form v-if="!!entity">
        <v-row align="center">
          <v-col align-self="center" cols="5">
            <v-text-field v-model="entity.name" label="Name"/>
          </v-col>
          <v-col align-self="center" cols="5">
            <v-text-field v-model="entity.number" type="number" label="Number"/>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col align-self="center" cols="5">
            <v-text-field v-model="entity.serialNumber" label="Serial Number"/>
          </v-col>
          <v-col align-self="center" cols="5">
            <entity-autocomplete-field v-model="entity.branchId" items-store-name="branches" label="Branch" item-text="name"/>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col align-self="center" cols="10">
              <v-textarea v-model="entity.description" label="Description" />
            </v-col>
        </v-row>
        <v-row align="center">
          <v-col align-self="center" cols="10">
              <v-textarea v-model="entity.indications" label="Indications" />
            </v-col>
        </v-row>
        <v-row align="center">
          <v-col align-self="center" cols="10">
            <v-textarea v-model="entity.contraindications" label="Contraindications" />
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
import * as deepcopy from "deepcopy";
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";
import EntityAutocompleteField from "../common/EntityAutocompleteField";

export default {
  name: "MedicineFormComponent",
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
  }),
  mounted() {
    this.entity = this.type === "create" ? {} : deepcopy(this.inputEntity)
  },
  methods: {
    changePatient() {
      this.loading = true;
      if (this.type === 'create') {
        RepositoryFactory.get("MEDICINE").create(this.entity).then((response) => {
          this.$emit("entityChanged", response.data);
          this.cancelCreatePatient();
        }).catch((error) => {
          EventBus.$emit("error", error);
        }).finally(() => {
          this.loading = false
        })
      } else {
        RepositoryFactory.get("MEDICINE").update(this.entity, this.entity.id).then((response) => {
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