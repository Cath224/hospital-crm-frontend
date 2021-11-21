<template>
  <div class="fill-height">
    <v-data-table :headers="headers" :items="items">

    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "PatientsComponent",
  data: () => ({
    headers: [
      {
        text: 'First Name',
        align: 'start',
        sortable: true,
        value: 'firstName',
      },
      {
        text: 'Last Name',
        align: 'start',
        sortable: true,
        value: 'lastName',
      },
    ],
    items: [],
  }),
}
</script>