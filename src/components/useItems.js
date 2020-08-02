import { computed, ref, watch } from 'vue';
import { useDebouncedRef } from './useDebouncedRef';
const dataMock = [
  { id: 'bc5cd492-4bad-4f73-a31d-feea2331f521', title: 'Carlie Dietrich' },
  { id: '56545c9b-0110-4c8d-ab0b-45984d635056', title: 'Jayden Rohan' },
  { id: 'be70ba7a-2fce-4330-be79-5eb8ad571f27', title: 'Monica Shanahan' },
  { id: '4e62a0f4-b843-4f0c-803e-38fde3434072', title: 'Trevor Raynor' },
  { id: 'd01b9df1-56e2-4705-82cd-7552e95de3a6', title: 'Webster Vandervort' },
];
export function useItems () {
  const items = ref([]);
  const isFetching = ref(false);
  const searchQuery = ref('');
  const searchQueryDebounced = useDebouncedRef(searchQuery, 300);

  async function getStuff (searchQuery) {
    isFetching.value = true;
    const data = await new Promise((resolve) => {
      setTimeout(() => resolve(searchQuery ? [] : dataMock), 200);
    });
    isFetching.value = false;
    items.value = data;
  }
  watch(searchQueryDebounced, getStuff, { immediate: true });

  const loading = computed(() => isFetching.value || searchQueryDebounced.value !== searchQuery.value);

  return {
    items,
    loading,
    searchQuery,
  };
}
