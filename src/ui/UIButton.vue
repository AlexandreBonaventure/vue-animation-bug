<script>
import { defineComponent, computed } from 'vue';

const themes = [
  'tiny',
  'primary',
  'secondary',
  'ghost',
  'link',
  'warning',
  'unstyled',
];
const themeProps = [...themes].reduce((acc, theme) => ({
  ...acc,
  [theme]: Boolean,
}), {});

export default defineComponent({
  props: {
    ...themeProps,
    to: {
      type: [String, Object],
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
    submit: {
      type: Boolean,
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
  },
  setup (props, { slots }) {
    const buttonTag = computed(() => {
      if (props.to) return 'RouterLink';
      if (props.href) return 'a';
      if (props.submit) return 'input';
      return 'button';
    });
    const buttonProps = computed(() => {
      if (props.to) return { to: props.to };
      if (props.href) return { href: props.href, target: '_BLANK', rel: 'noopener' };
      if (props.submit) return { type: 'submit' };
      return { type: 'button' };
    });
    const styleClasses = computed(() => {
      const filterThemes = themes.filter((theme) => props[theme]);
      if (!filterThemes.length) return ['primary'];
      return filterThemes;
    });
    const themeStyleClass = computed(() => `-${styleClasses.value.join('-')}`);
    const noContent = computed(() => {
      return !slots.default;
    });

    return {
      buttonTag,
      buttonProps,
      themeStyleClass,
      noContent,
    };
  },
});
</script>

<template>
  <component
    :is="buttonTag"
    v-bind="buttonProps"
    class="ui-button"
    :class="[ $style[themeStyleClass], themeStyleClass, { '-no-content': noContent } ]"
  >
    <slot />
  </component>
</template>

<style module lang="postcss">
.btn-reset {
  composes: f-body inline-flex items-center pa0 from global;
  color: inherit;
  background: none;
  border: none;
  appearance: none;
  text-shadow: none;
  text-decoration: none;
  box-shadow: none;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
}
.-primary {
  composes: btn-reset;
  composes: f-body b justify-center from global;

  transition: background 0.3s ease;
  transform: translateZ(0);
  will-change: background;

  border-radius: var(--radius);
  background: var(--colorSBRed);
  color: white;
  fill: white;
  &:global(.ui-button) {
    padding: 1.4rem var(--spacing-large);
  }
  &:global(.-no-content) {
    padding: 1.4rem;
  }

  &:hover {
    background: var(--colorSBRedHover);
  }

  &:global(.disabled),
  &[disabled] {
    cursor: not-allowed;
    background: var(--colorDisabled);
    color: rgba(255, 255, 255, 0.5);
    &:hover {
      background: var(--colorDisabled);
    }
  }
}
.-secondary {
  composes: -primary;
  fill: white;
  background: var(--colorDark);
  &:hover {
    background: var(--colorDarkest);
  }
}
.-ghost {
  composes: -primary;

  transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
  will-change: background, border, color;

  background: white;
  border: 0.1rem solid var(--colorLight);
  box-shadow: 0 0 1px var(--colorLight);
  color: var(--colorDarkest);
  padding-top: calc(1.4rem - 0.1rem);
  padding-bottom: calc(1.4rem - 0.1rem);

  &:hover {
    background: var(--colorLightest);
  }

  &:global(.active),
  &:global(.-active) {
    background-color: var(--colorDark);
    border: 0.1rem solid var(--colorDark);
    color: white;
    fill: white;
  }

  &:global(.error),
  &:global(.-error) {
    border: 0.1rem solid var(--colorErrorFlat);
    color: var(--colorErrorFlat);
  }

  &:global(.disabled),
  &:global(.-disabled),
  &[disabled] {
    background: rgba(247, 248, 248, 0.5);
    border: 0.1rem solid rgba(213, 216, 223, 0.5);
    color: var(--colorDisabled);
    fill: var(--colorDisabled);
    &:hover {
      background: rgba(247, 248, 248, 0.5);
    }
  }
}

.-tiny {
  composes: btn-reset;
  composes: f-label darkest b justify-center from global;

  transition: color 0.3s ease;
  transform: translateZ(0);
  will-change: color;

  &:global(.disabled),
  &:global(.-disabled),
  &[disabled] {
    cursor: not-allowed;
    pointer-events: none;
    fill: var(--colorDisabled);
    color: var(--colorDisabled);
  }
}
.-tiny-secondary {
  composes: -tiny;
  color: #314562;
  fill: #314562;
  &:hover {
    color: var(--colorDarkest);
    fill: var(--colorDarkest);
  }
}
.-link {
  composes: btn-reset;
  text-align: left;
  text-decoration: underline;
  color: var(--colorInfoFlat);
  &:hover {
    color: var(--colorInfoFlatHover);
  }
  transition: color 0.3s ease;
  transform: translateZ(0);
  will-change: color;
}
.-warning {
  composes: btn-reset;
  composes: f-label from global;
  color: var(--colorErrorFlat);
  fill: var(--colorErrorFlat);
  transition: color 0.3s ease;
  transform: translateZ(0);
  will-change: color;
  text-decoration: underline;
  &:hover {
    color: var(--colorErrorFlatHover);
    fill: var(--colorErrorFlatHover);
  }
}
.-unstyled {
  composes: btn-reset;
}
</style>

<style scoped lang="postcss">
.ui-button {
  appearance: none;
  &.focus-visible {
    outline: var(--outline-1);
  }
  &.-tiny.-light {
    color: var(--colorMedium);
    fill: var(--colorMedium);
    &:hover {
      color: var(--colorDark);
      fill: var(--colorDark);
    }
  }
  &.-tiny.-white {
    color: white;
    fill: white;
    &:hover {
      color: var(--colorLightest);
      fill: var(--colorLightest);
    }
  }
  &.-tiny.-dark {
    color: var(--colorDarkest);
    fill: var(--colorDarkest);
    &:hover {
      color: var(--colorDark);
      fill: var(--colorDark);
    }
  }
  &.-ghost.-white {
    color: white;
    background-color: transparent;
    fill: white;
    &:hover {
      color: var(--colorDarkest);
      background-color: white;
      fill: white;
    }
  }
  &.-link.-white {
    color: white;
    fill: white;
  }
  &.-link {
    font-size: inherit;
    line-height: inherit;
  }

  & .btnicon {
    /* width: 1.5rem;
    height: 1.5rem; */
    /* vertical-align: middle; */
    transition: fill 0.3s ease;
    /* margin-top: 0.4em; */
  }
}
</style>
