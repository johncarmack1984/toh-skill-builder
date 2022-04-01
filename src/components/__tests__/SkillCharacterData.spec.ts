import { describe, it } from "vitest";
import { factory } from "./index";
import SkillCharacterData from "@/components/SkillCharacterData.vue";
import { expect } from "chai";

describe("SkillCharacterData", () => {
  it("shows the character's name in a text input field", async () => {
    // instantiate the component & state
    const { wrapper, myTohSkillBuilder } = await factory(
      SkillCharacterData,
      {}
    );
    // test initial state
    expect(myTohSkillBuilder.character.characterName).toBe("");
    // find the character name field
    const characterNameInputField = wrapper.find("input[type=text]");
    // test initial state
    expect(characterNameInputField.element.value).toBe("");
    // set field value
    await characterNameInputField.setValue("Test Character");
    // test new value in state
    expect(myTohSkillBuilder.character.characterName).toBe("Test Character");
    // test new value in field
    expect(characterNameInputField.element.value).toBe("Test Character");
  });

  it("renders the remaining points & allows user to set total points", async () => {
    // instantiate the component & state
    const { wrapper, myTohSkillBuilder } = await factory(
      SkillCharacterData,
      {}
    );

    // test initial state
    //
    //--// remaining points
    expect(myTohSkillBuilder.remainingPoints)
      .toBe(
        myTohSkillBuilder.character.totalPoints -
          myTohSkillBuilder.totalUsedPoints
      )
      .toBe(20);
    //
    //--// total points
    expect(myTohSkillBuilder.character.totalPoints).toBe(20);

    // find render
    //
    //-//remaining points
    const remainingPointsRender = await wrapper.get(
      '[data-test="remainingPoints"]'
    );
    //
    //--// total points
    const totalPointsField = await wrapper.find('input[type="number"');

    // test render
    //
    //--// remaining points
    expect(remainingPointsRender.text()).toBe(
      myTohSkillBuilder.remainingPoints + " /"
    );
    //
    //--// total points
    expect(totalPointsField.element.value).toBe("20");

    //
    // set total points field to new value
    //
    //
    await totalPointsField.setValue(15);

    // test new value
    //
    //--// in state
    //
    //--//--// total points
    expect(myTohSkillBuilder.character.totalPoints).toBe(15);
    //
    //--//--// remaining points
    expect(myTohSkillBuilder.remainingPoints)
      .toBe(
        myTohSkillBuilder.character.totalPoints -
          myTohSkillBuilder.totalUsedPoints
      )
      .toBe(15);
    //
    //--// in render
    //--//--// remaining points
    expect(remainingPointsRender.text()).toBe(15 + " /");
    //--// total points

    expect(totalPointsField.element.value).toBe("15");

    // set new value in skill state

    await myTohSkillBuilder.$patch((state) => {
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 2;
      state.character.skills[2].skillLevel = 3;
      state.character.skills[3].skillLevel = 4;
    });

    // test new value in state
    expect(myTohSkillBuilder.character.totalPoints).toBe(15);

    // test new remainning points value in render
    expect(remainingPointsRender.text()).toBe(5 + " /");

    // test new total points value in field

    expect(totalPointsField.element.value).toBe("15");
  });
});
