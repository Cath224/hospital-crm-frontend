<template>
  <div class="d-flex flex-row">
    <v-autocomplete :value="value" :items="items"
                    :item-value="itemKey"
                    :item-text="itemText"
                    :loading="loading"
                    clearable
                    @blur="lazyItemsLoading ? loadItems : null"
                    @input="input"
                    @click:clear="input"
    >
      <template v-slot:append>
        <div>
          <v-btn icon @click="loadItems">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: "EntityAutocompleteField",
  props: {
    value: {},
    itemsStoreName: {
      type: String,
    },
    itemsRepository: {
      type: String,
    },
    itemKey: {
      type: String,
      default: () => "id",
    },
    itemText: {
      type: String,
      default: () => "name",
    },
    lazyItemsLoading: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    items: [],
    loading: false,
  }),
  mounted() {
    if (this.loading) {
      this.loadItems();
    }
  },
  methods: {
    loadItems: () => {
      this.loading = true;
      this.loading = false;
    },
    input: (value) => {
      this.$emit("input", value);
    },
  }
}
</script>