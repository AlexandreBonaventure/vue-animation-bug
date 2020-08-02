<script>
import UILoading from './UILoading.vue';
import { computed, h, vModelText, withDirectives } from 'vue';

export default {
  name: 'UIInput',
  components: {
    UILoading,
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      required: true,
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': val => typeof val === 'string',
  },
  setup (props, { emit, attrs }) {
    const model = computed({
      get () {
        return props.modelValue;
      },
      set (value) {
        emit('update:modelValue', value);
      },
    });
    return {
      model,
    };
  },
};
</script>
<template>
  <div>
    <input
      v-model="model"
      class="ui-input w-100"
      :class="{'-loading': loading, [$style.common]: true }"
      v-bind="$attrs"
    />
    <span class="relative w0">
      <UILoading
        v-if="loading"
        class="absolute right-0 ma3 z-1"
        small
      ></UILoading>
    </span>
  </div>
</template>

<style lang="postcss" scoped>
.ui-input {
  border-radius: var(--radius);
  border: 0.1rem solid var(--colorLight);
  box-shadow: 0 0 1px var(--colorLight);
  padding: calc(var(--spacing-medium) - 0.3rem)
    calc(var(--spacing-medium) - 0.2rem);

  &::placeholder {
    color: var(--colorLight);
  }
  &[type="search"] {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23D5D8DF"><path d="M21.7 20.3l-3.7-3.7c1.2-1.5 2-3.5 2-5.6 0-5-4-9-9-9s-9 4-9 9c0 5 4 9 9 9 2.1 0 4.1-0.7 5.6-2l3.7 3.7c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4zM4 11c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-0.8 3.7-2 4.9 0 0 0 0 0 0s0 0 0 0c-1.3 1.3-3 2-4.9 2-4 0.1-7.1-3-7.1-6.9z"></path></svg>');
    background-position: calc(100% - var(--spacing-small) - 3rem) 1.4rem;
    /* padding-left: 5rem; */
  }
  &.-loading {
    &[type="search"] {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23D5D8DF" fill-opacity="0.2"><path d="M21.7 20.3l-3.7-3.7c1.2-1.5 2-3.5 2-5.6 0-5-4-9-9-9s-9 4-9 9c0 5 4 9 9 9 2.1 0 4.1-0.7 5.6-2l3.7 3.7c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4zM4 11c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-0.8 3.7-2 4.9 0 0 0 0 0 0s0 0 0 0c-1.3 1.3-3 2-4.9 2-4 0.1-7.1-3-7.1-6.9z"></path></svg>');
    }
  }
  &.-light {
    border-width: 0 0 1px 0;
    border-radius: 0px;
    box-shadow: none;
  }
}
</style>
<style lang="postcss" module>
.common {
  composes: f-body b input-reset ba b--black-20 pa2 dib bg-white from global;
}
</style>
