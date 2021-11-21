<template>
  <v-navigation-drawer
      app
      permanent
      clipped
      style="background-color: transparent"
      mini-variant
      stateless
  >
    <v-list nav dense>
      <v-list-item v-for="item of menu" :key="item.route" :to="{name: item.route}" dense>
        <v-list-item-title>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">{{item.icon}}</v-icon>
            </template>
            <span>{{item.name}}</span>
          </v-tooltip>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: "NavigationComponent",
  data: () => ({
    menu: [
      {
        name: 'Home',
        icon: 'mdi-home',
        route: 'Home',
      },
      {
        name: 'Patients',
        icon: 'mdi-account-group',
        route: 'Patients',
      },
    ],
  }),

}
</script>