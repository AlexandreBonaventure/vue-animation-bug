<script>
import { h } from 'vue';
const UILoading = (props) => h('span', { class: 'ui-loading', style: props.small && { '--size': '1.5rem' } });
UILoading.props = {
  small: Boolean,
};
export default UILoading;

</script>

<style lang="postcss">
.ui-loading {
  --size: 3rem;
  text-indent: -9999rem;
  display: inline-block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: linear-gradient(
    to right,
    var(--colorInfoFlat) 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  animation: loading-spinner 0.8s infinite linear;
  transform: translateZ(0);
  mask-image: url('data:image/svg+xml;utf8,<svg preserveRatio="none" viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg"><circle stroke="white" stroke-width="8" fill="transparent" r="50%" cx="50%" cy="50%"/></svg>');
}
@keyframes loading-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
