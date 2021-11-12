<template>
  <v-dialog :value="value" max-width="20vw">
    <v-card height="40vh" width="30vw" :loading="loading">
      <v-card-title>Create Database</v-card-title>
      <v-card-text>
        <div v-if="!!entity" class="flex-row">
          <v-text-field v-model="entity.name" label="Name"/>
          <v-text-field v-model="entity.username" label="Username"/>
          <v-text-field v-model="entity.password" label="Password" type="password"/>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-row align="center" justify="end">
          <v-col cols="auto">
            <v-btn color="primary" @click="createDb">Create</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" text @click="cancelCreation">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DbDialog",
  props: {
    value: {
      type: Boolean,
      required: true,
      defaultValue: true,
    }
  },
  data: () => ({
    entity: null,
    loading: false,
  }),
  watch: {
    value: {
      handler(newValue) {
        if (!newValue) {
          this.clear();
        } else {
          this.entity = {};
        }
      },
      immediate: true,
    },
  },
  methods: {
    createDb() {
      this.loading = true;
      this.$store.dispatch('db/createDb', this.entity).then(() => {
        this.$emit('created');
      }).finally(() => {
        this.loading = false;
      });
    },
    cancelCreation() {
      this.$emit('cancelCreation');
    },
    clear() {
      this.entity = null;
    },
  }
}
</script>