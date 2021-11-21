<template>
  <v-row align="center" justify="center">
    <v-col cols="auto">
      <user-login-page-component/>
    </v-col>
  </v-row>
</template>

<script>
import UserLoginPageComponent from "../../components/user/UserLoginPageComponent";

export default {
  name: "UserLoginPage",
  components: {UserLoginPageComponent}
}
</script>