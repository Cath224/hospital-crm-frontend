<template>
  <div class="d-flex flex-row">
    <v-autocomplete :value="dataValue" :items="items"
                    :item-value="itemKey"
                    :item-text="itemText"
                    :loading="loading"
                    :label="label"
                    :return-object="objectReturn"
                    :multiple="multi"
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
import {mapGetters} from "vuex";

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
    },
    label: {
      type: String,
      required: true,
    },
    multi: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    dataValue: null,
    items: [],
    loading: false,
  }),
  computed: {
    ...mapGetters("content", {
      getContents: 'getContents',
    }),
  },
  watch: {
    value: {
      handler(newValue) {
        this.dataValue = newValue;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.dataValue = this.value;
    if (!this.lazyItemsLoading) {
      this.loadItems();
    }
  },
  methods: {
    setValue(value) {
      this.dataValue = value;
    },
    getItemText(value) {
      if (this.itemTextFunction != null) {
        return this.itemTextFunction(value);
      }
      return value;
    },
    loadItems() {
      this.loading = true;
      if (this.itemsStoreName) {
        this.items = this.getContents(this.itemsStoreName);
        this.loading = false;
      } else {
        let result = RepositoryFactory.get(this.itemsRepositoryName).get(null);
        result.then((response) => {
          this.items = response.data
        }).catch((error) => {
          EventBus.$emit("error", error)
        }).finally(() => {
          this.loading = false;
        });
      }

    },
    input(value) {
      this.$emit("input", value);
    },
  }
}
</script>