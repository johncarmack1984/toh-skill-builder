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

    //--// remaining points

    expect(myTohSkillBuilder.remainingPoints).toBe(
      myTohSkillBuilder.character.totalPoints -
        myTohSkillBuilder.totalUsedPoints
    );

    //--// total points

    expect(myTohSkillBuilder.character.totalPoints).toBe(20);

    // find the remaining points render
    const remainingPointsRender = await wrapper.get(
      '[data-test="remainingPoints"]'
    );

    // test initial remaining point render
    expect(remainingPointsRender.text()).toBe(
      myTohSkillBuilder.remainingPoints + " /"
    );

    // find the total points render
    const totalPointsField = await wrapper.find('input[type="number"');

    // test initial state
    expect(totalPointsField.element.value).toBe("20");

    // set field value
    await totalPointsField.setValue(15);

    // test new value in state
    expect(myTohSkillBuilder.character.totalPoints).toBe(15);

    // test new remainning points value in render
    expect(remainingPointsRender.text()).toBe(15 + " /");

    // test new total points value in field

    expect(totalPointsField.element.value).toBe("15");
  });
});
