import { describe, it } from "vitest";
import { factory } from "./index";
import SkillPyramid from "@/components/SkillPyramid.vue";
import { expect } from "chai";

describe("SkillPyramid", () => {
  it("renders a visual representation of skill levels selected", () => {
    const { wrapper, myTohSkillBuilder } = factory(SkillPyramid);

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
