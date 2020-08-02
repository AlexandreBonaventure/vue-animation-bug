<script>
import { defineComponent, ref, watch, h, mergeProps, computed } from 'vue';
import { UICheckbox, UILoading, UIAnimation } from '../ui';

const UITableHeader = (props, { slots, attrs }) => h('th', mergeProps(attrs, { class: 'tableth dtc f-header bb b--medium tl pv2 v-mid pl3' }),
  (!props.direction) ? slots.default?.()
    : [
      h('div', { class: 'flex items-center pointer' }, [
      slots.default?.(),
      ]),
    ]);
const UITableCell = (props, { slots, attrs }) => h('td', mergeProps(attrs, { class: 'tabletd dtc pv2 f-body v-mid f-body pl3' }), slots.default?.());
export default defineComponent({
  components: {
    UICheckbox,
    UILoading,
    UIAnimation,
    UITableHeader,
    UITableCell,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedItems: {
      type: Set,
      required: false,
      default: () => new Set(),
    },
    firstLoad: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup (props) {
    const showSelectionCheckbox = computed(() => {
      return props.selectedItems !== null;
    });

    const shouldTransition = ref(props.firstLoad);
    const isTransitioning = ref(false);
    const isTransitioningToEmpty = ref(false);

    watch(() => props.items.length, (to, from) => {
      if (from > 0 && to === 0) {
        isTransitioningToEmpty.value = true;
      } else {
        isTransitioningToEmpty.value = false;
      }
    });

    return {
      showSelectionCheckbox,

      UITableCell,
      UITableHeader,

      shouldTransition,
      isTransitioning,
      isTransitioningToEmpty,
    };
  },
});
</script>

<template>
  <div
    class="ui-table"
    :class="{'-loading': loading, '-transitioning': isTransitioning, '-transitioning-to-empty':isTransitioning && isTransitioningToEmpty, '-transitioning-to-table':isTransitioning && !isTransitioningToEmpty, '-selectable': showSelectionCheckbox }"
  >
    <div class="tablecontainer relative w-100">
      <UIAnimation
        name="fade"
        :appear="shouldTransition"
        duration="150"
        @before-leave="isTransitioning = true"
        @after-enter="isTransitioning = false"
      >
        <div
          v-if="firstLoad"
          class="loadingcontainer pa4 tc"
          style="min-height: 10rem"
        >
          <UILoading />
        </div>
        <div
          v-else-if="$slots.emptyList && items.length === 0"
          class="emptylistcontainer pa4 tc"
          style="min-height: 10rem"
        >
          <slot name="emptyList"></slot>
        </div>
        <table
          v-else
          class="table dt dt--fixed relative z-0 f-body w-100"
        >
          <thead
            v-if="items.length > 0"
            class="thead"
          >
            <UITableHeader class="tablethcheckbox"></UITableHeader>
            <slot
              name="header"
              v-bind="{ UITableHeader }"
            ></slot>
          </thead>

          <tbody class="tbody">
            <tr
              v-for="(item, i) of items"
              :key="i"
              class="tabletr dt-row"
              unstyled
            >
              <UITableCell class="pl3 z-1">
                <UICheckbox
                  class="checkbox"
                  :modelValue="selectedItems.has(item.id)"
                />
              </UITableCell>
              <slot
                name="item"
                v-bind="{ item, UITableCell }"
              ></slot>
            </tr>
          </tbody>
        </table>
      </UIAnimation>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.ui-table .tablecontainer {
  &:after {
    content: "";
    background-color: transparent;
    border: 1px solid var(--colorLight);
    box-shadow: var(--lightDropShadow);
    border-radius: var(--radius);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    z-index: -4;
    pointer-events: none;
  }
}
.ui-table {
  --uitable-bg: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100% 100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" stroke="%23D5D8DF" stroke-width="2px"><line x1="0" y1="100%" x2="100%" y2="100%"></line></svg>');
  & .tabletr {
    display: table-row;
    background-image: var(--uitable-bg);
  }
  &::v-deep(.tabletd > .ui-button.-link) {
    text-decoration: none;
    color: var(--colorDark);
    &:hover {
      text-decoration: underline;
      color: var(--colorInfoFlatHover);
    }
  }
  & .tablethcheckbox {
    width: 4.8rem;
  }
  &.-selectable {
    &::v-deep(.tableth:first-child) {
      padding-left: 0;
    }
    &::v-deep(.tableth:first-child + .tableth) {
      padding-left: 0;
    }
    &::v-deep(.tabletd:first-child + .tabletd) {
      padding-left: 0;
    }
  }
  &::v-deep(.tabletd) {
    position: relative;
  }
  &.-loading,
  &.-transitioning-to-empty {
    & .tabletr {
      opacity: 0.5;
    }
  }
  &.-loading,
  &.-transitioning-to-table {
    & .emptylistcontainer::v-deep(> *) {
      opacity: 0.5;
    }
  }
}
</style>
