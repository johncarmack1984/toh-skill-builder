import { describe, expect, it } from "vitest";
import { factory } from "@/__tests__/index";
import SkillCharacterData from "@/components/SkillCharacterData.vue";

describe("SkillCharacterData", () => {
  it("shows the character's name in a text input field", async () => {
    // instantiate the component & state
    const { wrapper, store } = await factory(SkillCharacterData, {});
    // test initial state
    expect(store.character.name).toBe("");
    // find the character name field
    const nameInputField = wrapper.find("input[type=text]");
    // test initial state
    expect(nameInputField.element.value).toBe("");
    // set field value
    await nameInputField.setValue("Test Character");
    // test new value in state
    expect(store.character.name).toBe("Test Character");
    // test new value in field
    expect(nameInputField.element.value).toBe("Test Character");
  });

  it("renders the remaining points & allows user to set total points", async () => {
    // instantiate the component & state
    const { wrapper, store } = await factory(SkillCharacterData, {});

    // test initial state
    //
    //--// remaining points
    expect(store.remainingPoints)
      .toBe(store.character.totalPoints - store.totalUsedPoints)
      .toBe(20);
    //
    //--// total points
    expect(store.character.totalPoints).toBe(20);

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
    expect(remainingPointsRender.text()).toBe(store.remainingPoints + " /");
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
    expect(store.character.totalPoints).toBe(15);
    //
    //--//--// remaining points
    expect(store.remainingPoints)
      .toBe(store.character.totalPoints - store.totalUsedPoints)
      .toBe(15);
    //
    //--// in render
    //--//--// remaining points
    expect(remainingPointsRender.text()).toBe(15 + " /");
    //--// total points

    expect(totalPointsField.element.value).toBe("15");

    // set new value in skill state

    await store.$patch((state) => {
      state.character.skills[0].value = 1;
      state.character.skills[1].value = 2;
      state.character.skills[2].value = 3;
      state.character.skills[3].value = 4;
    });

    // test new value in state
    expect(store.character.totalPoints).toBe(15);

    // test new remainning points value in render
    expect(remainingPointsRender.text()).toBe(5 + " /");

    // test new total points value in field

    expect(totalPointsField.element.value).toBe("15");
  });
});
