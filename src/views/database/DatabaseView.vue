<template>
  <v-row align="center" justify="center">
    <v-col cols="auto">
      <db-select-form />
    </v-col>
  </v-row>
</template>

<script>
import DbSelectForm from "../../components/db/DbSelectForm";

export default {
  name: "DatabaseView",
  components: {DbSelectForm},
}
</script>