<template>
  <div class="d-flex flex-row flex-grow-1">
    <div v-if="!loading && !!item">{{ item[entityField] }}</div>
    <div v-else-if="loading">
      <v-progress-circular color="primary"/>
    </div>
  </div>
</template>

<script>
import EventBus from "../../plugins/event-bus";
import {RepositoryFactory} from "../../utils/RepositoryFactory";
import {mapGetters} from "vuex";

export default {
  name: "EntityTableField",
  props: {
    entityRepository: {
      type: String,
      required: false,
    },
    entityStore: {
      type: String,
      required: false,
    },
    entityField: {
      type: String,
      default: "name",
    },
    entityIdValue: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    loading: false,
    item: null,
  }),
  computed: {
    ...mapGetters("content", {
      getContentById: 'getContentById',
    })
  },
  watch: {
    entityIdValue: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.loadItem();
        }
      },
      immediate: true,
    }
  },
  methods: {
    loadItem() {
      this.loading = true;
      if (this.entityStore) {
        this.item = this.getContentById(this.entityStore, this.entityIdValue);
        this.loading = false;
      } else {
        RepositoryFactory.get(this.entityRepository).getById(this.entityIdValue).then((response) => {
          this.item = response.data;
        })
            .catch((error) => {
              EventBus.$emit("error", error);
            })
            .finally(() => {
              this.loading = false;
            });
      }

    }
  }

}
</script>