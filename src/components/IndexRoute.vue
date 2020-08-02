<script>
import { defineComponent } from 'vue';
import {
  UIInput,
} from '../ui';
import { useItems } from './useItems';
import CustomTable from './CustomTable.vue';

export default defineComponent({
  components: {
    UIInput,
    CustomTable,
  },
  setup () {
    const {
      items,
      loading,
      searchQuery,
    } = useItems();

    return {
      items,
      loading,
      searchQuery,
    };
  },
});
</script>

<template>
  <div class="device-index-route">
    <UIInput
      v-model="searchQuery"
      type="search"
      placeholder="Search"
      :loading="loading"
    />
    <div>
      <CustomTable
        :items="items"
        class="mb5"
      ></CustomTable>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.tableheader {
  grid-template-areas: "a b c d";
  grid-template-columns: calc(4.8rem - var(--spacing-medium));
  grid-auto-columns: auto;
}
</style>
