<template>
  <v-dialog :value="value" max-width="40vw" @close="close" @click:outside="close">
    <slot v-if="custom"></slot>
    <v-card v-else :loading="loading">
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
    },
    custom: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>