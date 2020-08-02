<script>
import { h, Transition, mergeProps } from 'vue';
const fade = {
  enterActiveClass: 'animate__animated animate__fadeIn',
  leaveActiveClass: 'animate__animated animate__fadeOut',
  mode: 'out-in',
};
const zoom = {
  enterActiveClass: 'animate__animated animate__zoomIn',
  leaveActiveClass: 'animate__animated animate__zoomOut',
  mode: 'out-in',
};
const supportedAnimations = {
  fade,
  zoom,
};
const UIAnimation = (props, { slots }) => {
  let durationClass = 'animate__faster';
  if (props.duration) durationClass = `animated-${props.duration}`;
  return h(Transition, mergeProps(supportedAnimations[props.name], { class: durationClass }), slots);
};
UIAnimation.props = {
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
};
export default UIAnimation;
</script>
