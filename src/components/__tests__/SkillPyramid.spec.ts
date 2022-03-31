import { mount } from "@vue/test-utils";
import SkillPyramid from "@/components/SkillPyramid.vue";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";
import { describe, it, fn } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import type { TestingOptions } from "./index";
import { expect } from "chai";

describe("SkillPyramid", () => {
  function factory(options?: TestingOptions) {
    const wrapper = mount(SkillPyramid, {
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

  it("renders a visual representation of skill levels selected", () => {
    const { wrapper, myTohSkillBuilder } = factory();

    expect(myTohSkillBuilder.character.skills[0].skillLevel).toBe(0);

    expect(wrapper.vm.redSquares()).toBe(0);
    expect(wrapper.vm.greenSquares()).toBe(0);
    expect(wrapper.vm.yellowSquares()).toBe(0);
    expect(wrapper.vm.purpSquares()).toBe(0);

    myTohSkillBuilder.$patch((state) => {
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 2;
      state.character.skills[2].skillLevel = 3;
      state.character.skills[3].skillLevel = 4;
    });
    expect(myTohSkillBuilder.totalUsedPoints).toBe(10);

    expect(wrapper.vm.redSquares()).toBe(1);
    expect(wrapper.vm.greenSquares()).toBe(1);
    expect(wrapper.vm.yellowSquares()).toBe(1);
    expect(wrapper.vm.purpSquares()).toBe(1);
  });
});
