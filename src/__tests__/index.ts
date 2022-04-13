import { vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import type { TestingOptions } from "./index";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";
import type { DefineComponent } from "vue";
import clickOutside from "@/directives/clickOutside";

/**
 * @module @pinia/testing
 */
export { createTestingPinia } from "./index";
export type { TestingPinia, TestingOptions } from "./index";

export function factory(component: DefineComponent, options?: TestingOptions) {
  const wrapper = mount(component, {
    global: {
      directives: {
        clickOutside: clickOutside,
      },
      plugins: [
        createTestingPinia({
          // https://github.com/vuejs/pinia/discussions/1096
          createSpy: vi.fn,
        }),
      ],
    },
    ...options,
  });

  const store = myTohSkillBuilderStore();

  return { wrapper, store };
}
