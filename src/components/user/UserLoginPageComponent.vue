<template>
  <v-card min-width="30vw">
    <v-card-title>
      Sign In
    </v-card-title>
    <v-card-text>
      <div class="d-flex flex-column col-auto">
        <div>
          <entity-autocomplete-field v-model="doctor" items-repository-name="DOCTOR"
                                     :item-text-function="(value) => `${value.firstName} ${value.lastName}`"
                                     object-return/>
        </div>
        <div class="d-flex flex-row align-center justify-end">
          <v-btn class="mx-2" color="primary" @click="selectDoctor">Select</v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

import EntityAutocompleteField from "../common/EntityAutocompleteField";

export default {
  name: "UserLoginPageComponent",
  components: {EntityAutocompleteField},
  data: () => ({
    doctor: null,
  }),
  methods: {
    selectDoctor() {
      this.$store.dispatch('configuration/selectDoctor', this.doctor)
      .then(() => {
        this.$router.push({name: "Home"})
      })
    },
  }
}
</script>