<template>
  <v-card min-width="30vw">
    <v-card-title>
      Sign In
    </v-card-title>
    <v-card-text>
      <div class="d-flex flex-column col-auto">
        <div>
          <v-text-field v-model="username" label="Username" clearable/>
          <v-text-field v-model="password" type="password" label="Password" clearable/>
        </div>
        <div class="d-flex flex-row align-center justify-end">
          <v-btn class="mx-2" color="primary" text @click="signUp">Sign up</v-btn>
          <v-btn color="primary" @click="signIn">Sign in</v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: "UserLoginPageComponent",
  data: () => ({
    username: null,
    password: null,
  }),
  methods: {
    signUp() {
      this.$store.dispatch('configuration/selectUser', {
        username: this.username,
        password: this.password,
      })
      let page = this.$route.query?.page;
      if (!page) {
        page = 'Home';
      }
      this.$router.push({name: page});

    },
    signIn() {
      this.signUp();
    },
  }
}
</script>