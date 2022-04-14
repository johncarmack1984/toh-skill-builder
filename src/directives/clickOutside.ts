import type { DirectiveBinding, RendererElement } from "vue";

export default {
  mounted: (el: RendererElement, binding: DirectiveBinding) => {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el: {
    clickOutsideEvent: (this: HTMLElement, ev: MouseEvent) => Event;
  }) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
