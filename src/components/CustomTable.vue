<script>
import { defineComponent } from 'vue';
import { UIButton } from '../ui';
import UITable from './UITable.vue';

export default defineComponent({
  components: {
    UIButton,
    UITable,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
});
</script>

<template>
  <UITable :items="items">
    <template #header="{ UITableHeader }">
      <component :is="UITableHeader">Name</component>
    </template>
    <template #emptyList>No results</template>
    <template #item="{ UITableCell, item }">
      <component :is="UITableCell">
        <UIButton
          link
          class="f-body b truncate"
        >{{ item.title }}</UIButton>
      </component>
    </template>
  </UITable>
</template>
