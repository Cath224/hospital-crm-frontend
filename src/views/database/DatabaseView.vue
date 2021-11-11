<template>
  <v-row align="center" justify="center">
    <v-col cols="auto">
      <v-card width="20vw" height="25vh">
        <v-card-title >
          DB
        </v-card-title>
        <v-card-text>
          <v-autocomplete
              v-model="selectedDb"
              label="Select DB"
              items="dbs"
          />
        </v-card-text>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn color="primary">Select</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn text color="primary">Create</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DatabaseView",
  data: () => ({
    selectedDb: null,
    dbs: [
      {
        value: 'test',
        text: 'Text'
      }
    ]
  }),
}
</script>