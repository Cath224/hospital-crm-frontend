<template>
  <div>
    <v-card width="20vw">
      <v-card-title>
        Hospital CRM DB
      </v-card-title>
      <v-card-text>
        <v-autocomplete
            v-model="computedSelectDb"
            :items="getDbs"
            label="Select DB"
            item-value="id"
            item-text="name"
            clearable
        />
        <div v-if="computedDbSelected">
          <v-text-field
              v-model="username"
              label="Username"
          />
          <v-text-field
              v-model="password"
              label="Password"
              type="password"
          />
        </div>

      </v-card-text>
      <v-card-actions>
        <v-row align="center" justify="end">
          <v-col cols="auto">
            <v-btn color="primary">Select</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn text color="primary" @click="createDb">Create</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <db-dialog v-model="createDbDialog" @created="dbCreated" @cancelCreation="closeDbCreationDialog"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import DbDialog from "./DbDialog";

export default {
  name: "DbSelectForm",
  components: {DbDialog},
  data: () => ({
    createDbDialog: false,
    username: null,
    password: null,
  }),
  computed: {
    ...mapGetters('db', {
      getDbs: 'getDbs',
    }),
    ...mapGetters('configuration', {
      getSelectedDb: 'getSelectedDb',
    }),
    computedSelectDb: {
      get() {
        return this.getSelectedDb;
      },
      set(value) {
        this.$store.dispatch('configuration/selectDb', value);
      },
    },
    computedDbSelected() {
      return !!this.getSelectedDb;
    },
  },
  methods: {
    createDb() {
      this.createDbDialog = true;
    },
    dbCreated() {
      this.closeDbCreationDialog();
    },
    closeDbCreationDialog() {
      this.createDbDialog = false;
    },
  }
}
</script>