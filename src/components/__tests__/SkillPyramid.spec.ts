import { describe, it } from "vitest";
import { factory } from "./index";
import SkillPyramid from "@/components/SkillPyramid.vue";
import { expect } from "chai";

describe("SkillPyramid", () => {
  it("renders a visual representation of skill levels selected", async () => {
    // instantiate component and state
    const { wrapper, myTohSkillBuilder } = await factory(SkillPyramid, {});

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

    await myTohSkillBuilder.newCharacter();

    myTohSkillBuilder.$patch((state) => {
      state.character.skills[0].skillLevel = 0;
      state.character.skills[1].skillLevel = 0;
      state.character.skills[2].skillLevel = 0;
      state.character.skills[3].skillLevel = 0;
    });

    expect(myTohSkillBuilder.totalUsedPoints).toBe(0);
    expect(wrapper.vm.redSquares()).toBe(0);
    expect(wrapper.vm.greenSquares()).toBe(0);
    expect(wrapper.vm.yellowSquares()).toBe(0);
    expect(wrapper.vm.purpSquares()).toBe(0);
  });
  /*
  it("renders a clean interface when character is reset to default", async () => {
    const { wrapper, myTohSkillBuilder } = await factory(SkillPyramid, {});

    await myTohSkillBuilder.$patch((state) => {
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 1;
      state.character.skills[2].skillLevel = 2;
      state.character.skills[3].skillLevel = 2;
      state.character.skills[4].skillLevel = 3;
      state.character.skills[5].skillLevel = 3;
      state.character.skills[6].skillLevel = 4;
      state.character.skills[7].skillLevel = 4;
    });

    console.log(wrapper.text());

    await myTohSkillBuilder.resetScores();

    console.log(wrapper.text());
  });
*/
});
