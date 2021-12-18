<template>
  <div class="d-flex flex-row">
    <v-autocomplete :value="value" :items="items"
                    :item-value="itemKey"
                    :item-text="itemText"
                    :loading="loading"
                    :return-object="objectReturn"
                    clearable
                    @blur="lazyItemsLoading ? loadItems : null"
                    @input="input"
                    @click:clear="input"
    >
      <template v-if="!itemText" v-slot:item="{item}">
        {{ getItemText(item) }}
      </template>
      <template v-if="!itemText" v-slot:selection="{item}">
        {{ getItemText(item) }}
      </template>
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
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import EventBus from "../../plugins/event-bus";

export default {
  name: "EntityAutocompleteField",
  props: {
    value: {},
    itemsStoreName: {
      type: String,
    },
    itemsRepositoryName: {
      type: String,
    },
    itemKey: {
      type: String,
      default: () => "id",
    },
    itemText: {
      type: String,
    },
    lazyItemsLoading: {
      type: Boolean,
      default: false,
    },
    objectReturn: {
      type: Boolean,
      default: false,
    },
    itemTextFunction: {
      type: Function,
    }
  },
  data: () => ({
    items: [],
    loading: false,
  }),
  mounted() {
    if (!this.lazyItemsLoading) {
      this.loadItems();
    }
  },
  methods: {
    getItemText(value) {
      if (this.itemTextFunction != null) {
        return this.itemTextFunction(value);
      }
      return value;
    },
    loadItems() {
      this.loading = true;
      let result = RepositoryFactory.get(this.itemsRepositoryName).get(null);
      result.then((response) => {
        this.items = response.data
      }).catch((error) => {
        EventBus.$emit("error", error)
      }).finally(() => {
        this.loading = false;
      });
    },
    input(value) {
      this.$emit("input", value);
    },
  }
}
</script>