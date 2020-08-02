<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'UICheckbox',
  components: {
  },
  props: {
    modelValue: {
      required: true,
      type: Boolean,
    },
    preventDefault: {
      type: Boolean,
      default: true,
    },
    partialState: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
    bold: Boolean,
  },
  emits: {
    click: null,
    input: val => typeof val === 'boolean',
    'update:modelValue': val => typeof val === 'boolean',
  },
});
</script>

<template>
  <label
    class="ui-checkbox relative items-center flex"
    :class="{'-partial': partialState, '-disabled': disabled, '-active': modelValue, '-bold': bold}"
  >
    <div class="inputwrapper flex-shrink-0">
      <input
        class="input"
        type="checkbox"
        :disabled="disabled"
      />
      <span class="checkboxcustom"></span>
    </div>
  </label>
</template>

<style scoped lang="postcss">
.ui-checkbox {
  --size: 1.6rem;
  cursor: pointer;
  &:hover {
    &::v-deep(.formitem *) {
      color: black;
    }
  }
  & .inputwrapper {
    height: var(--size);
    width: var(--size);
  }
  & .input {
    position: absolute;
    opacity: 0;
    top: -9999px;
    left: -9999px;
    cursor: pointer;
    &.focus-visible + .checkboxcustom {
      outline: var(--outline-1);
    }
  }
  & .checkboxcustom {
    position: absolute;
    height: var(--size);
    width: var(--size);
    background-color: transparent;
    border-radius: 3px;
    transition: all 0.3s ease-out, outline 0s ease;
    border: 2px solid var(--colorDarkest);
  }
  &.-active,
  &.-partial {
    & .checkboxcustom {
      background: var(--colorInfoFlat);
      transform: rotate(0deg) scale(1);
      opacity: 1;
      border: 2px solid var(--colorInfoFlat);
      &::after {
        transform: scale(1);
        opacity: 1;
        width: 100%;
        height: 100%;
      }
    }
  }
  &.-partial .checkboxcustom {
    background: white;
  }
  &::v-deep(.formitem .title) {
    font-weight: 400;
  }
  &.-bold ::v-deep(.formitem .title) {
    font-weight: 600;
  }
  &.-disabled {
    cursor: not-allowed;

    &::v-deep(.title) {
      color: var(--colorMedium);
    }

    & .checkboxcustom {
      border: 2px solid var(--colorLight);
    }
    &.-active .checkboxcustom {
      background-color: var(--colorMedium);
      border-color: var(--colorMedium);
    }
    &.-partial .checkboxcustom {
      border: 2px solid var(--colorLight);
      background: white;
      &::after {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid slice"><line style="stroke:%23D5D8DF;stroke-width:4px" x1="10%" y1="50%" x2="90%" y2="50%" /></svg>');
      }
    }
  }

  & .checkboxcustom::after {
    position: absolute;
    pointer-events: none;
    content: "";
    transform: scale(0);
    opacity: 1;
    transition: all 0.3s ease-out;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid slice" style="fill:white;stroke:white;"><path d="M20.7 5.3c-0.4-0.4-1-0.4-1.4 0l-10.3 10.3-4.3-4.3c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5 5c0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l11-11c0.4-0.4 0.4-1 0-1.4z" /></svg>');
    background-size: cover;
  }
  &.-partial {
    & .checkboxcustom::after {
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid slice"><line style="stroke:%234CA7F4;stroke-width:4px" x1="10%" y1="50%" x2="90%" y2="50%" /></svg>');
    }
  }
  /* For Ripple Effect */
  & .checkboxcustom::before {
    pointer-events: none;
    position: absolute;
    content: "";
    left: 10px;
    top: 10px;
    width: 0px;
    height: 0px;
    border-radius: 5px;
    border: 2px solid #ffffff;
    transform: scale(0);
  }
  &.-active .checkboxcustom::before {
    left: -3px;
    top: -3px;
    width: 24px;
    height: 24px;
    border-radius: 5px;
    transform: scale(3);
    opacity: 0;
    z-index: 999;
    transition: all 0.2s ease-out;
  }
}
</style>
