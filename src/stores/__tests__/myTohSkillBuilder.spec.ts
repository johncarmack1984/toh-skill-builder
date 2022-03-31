import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";

describe("myTohSkillBuilder", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("calculates total used points", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    expect(myTohSkillBuilder.totalUsedPoints).toBe(0);

    myTohSkillBuilder.$patch((state) => {
      state.character.skills[0].skillLevel++;
    });

    expect(myTohSkillBuilder.totalUsedPoints).toBe(1);
  });

  it("calculates remaining points", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    expect(myTohSkillBuilder.remainingPoints).toBe(
      myTohSkillBuilder.character.totalPoints -
        myTohSkillBuilder.totalUsedPoints
    );
  });

  it('adds a copy of "character" to "savedCharacters"', () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    expect(myTohSkillBuilder.savedCharacters).toEqual([]);

    myTohSkillBuilder.saveCharacter();

    expect(myTohSkillBuilder.savedCharacters.length).toBe(1);
  });
});
