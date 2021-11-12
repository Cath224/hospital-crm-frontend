<template>
  <v-app style="background-color: #F2F7FF">
    <v-main>
      <v-container fluid class="fill-height">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('db/refreshDbs');
  }
};
</script>
