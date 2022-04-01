import { fn } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import type { TestingOptions } from "./index";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";

/**
 * @module @pinia/testing
 */
export { createTestingPinia } from "./index";
export type { TestingPinia, TestingOptions } from "./index";

export function factory(component: DefineComponent, options?: TestingOptions) {
  const wrapper = mount(component, {
    global: {
      plugins: [
        createTestingPinia({
          // https://github.com/vuejs/pinia/discussions/1096
          createSpy: fn,
        }),
      ],
    },
    ...options,
  });

  const myTohSkillBuilder = myTohSkillBuilderStore();

  return { wrapper, myTohSkillBuilder };
}
