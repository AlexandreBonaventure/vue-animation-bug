<script>
import { defineComponent } from 'vue';
import IndexRoute from './components/IndexRoute.vue';

export default defineComponent({
  name: 'App',
  components: {
    IndexRoute,
  },
});
</script>

<template>
  <IndexRoute></IndexRoute>
</template>

<style lang="postcss">
@import "/index.css";
</style>
