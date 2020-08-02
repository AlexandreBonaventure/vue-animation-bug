import { customRef, unref, watch } from 'vue';

function createDebouncedRef (value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get () {
        track();
        return value;
      },
      set (newValue) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}

export function useDebouncedRef (value, delay = 200) {
  const debouncedRef = createDebouncedRef(unref(value), delay);
  watch(value, (val) => {
    debouncedRef.value = val;
  });
  return debouncedRef;
}
