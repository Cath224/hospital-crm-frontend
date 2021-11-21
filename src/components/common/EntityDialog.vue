<template>
  <v-dialog :value="value" max-width="40vw" @close="close" @click:outside="close">
    <v-card  :loading="loading">
      <v-card-title>{{title}}</v-card-title>
      <v-card-text>
        <slot v-if="!loading"></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EntityDialog",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>