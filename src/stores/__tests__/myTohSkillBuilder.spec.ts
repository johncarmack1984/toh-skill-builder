import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";
import { defaultCharacter } from "@/characterTemplates/TheDefaultCharacterTemplate";

describe("myTohSkillBuilder", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active, so it's automatically picked
    // up by useStore()  without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
    const myTohSkillBuilder = myTohSkillBuilderStore();
    myTohSkillBuilder.$reset();
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
    expect(myTohSkillBuilder.savedCharacters[0]).toBeTruthy();
  });

  it("creates a new character by setting default state", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.$patch((state) => {
      state.character.name = "Test Character";
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 2;
      state.character.skills[2].skillLevel = 3;
      state.character.skills[3].skillLevel = 4;
    });

    expect(myTohSkillBuilder.character.name).toBe("Test Character");

    expect(myTohSkillBuilder.totalUsedPoints).toBe(10);

    expect(myTohSkillBuilder.savedCharacters).toEqual([]);

    myTohSkillBuilder.newCharacter();

    expect(myTohSkillBuilder.character.skills[0].skillLevel).toBe(0);

    expect(myTohSkillBuilder.totalUsedPoints).toBe(0);

    expect(myTohSkillBuilder.savedCharacters.length).toBe(1);
  });

  it("resets scores", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.$patch((state) => {
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 2;
      state.character.skills[2].skillLevel = 3;
      state.character.skills[3].skillLevel = 4;
    });

    expect(myTohSkillBuilder.totalUsedPoints).toBe(10);

    myTohSkillBuilder.resetScores();

    expect(myTohSkillBuilder.totalUsedPoints).toBe(0);
  });

  it("resets total points", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.$patch((state) => {
      state.character.totalPoints = 25;
    });

    expect(myTohSkillBuilder.character.totalPoints).toBe(25);

    myTohSkillBuilder.resetTotalPoints();

    expect(myTohSkillBuilder.character.totalPoints).toBe(20);
  });

  it("resets character name", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.$patch((state) => {
      state.character.characterName = "Test Character";
    });

    expect(myTohSkillBuilder.character.characterName).toBe("Test Character");

    myTohSkillBuilder.resetCharacterName();

    expect(myTohSkillBuilder.character.characterName).toBe("");
  });

  it("resets skill names", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.$patch((state) => {
      for (const skill of state.character.skills) {
        skill.skillName = "Test Skill Name";
      }
    });

    for (const skill of myTohSkillBuilder.character.skills) {
      expect(skill.skillName).toBe("Test Skill Name");
    }

    myTohSkillBuilder.resetSkillNames();

    for (const [index, skill] of myTohSkillBuilder.character.skills.entries()) {
      expect(skill.skillName).toBe(defaultCharacter.skills[index].skillName);
    }
  });

  it("resets all together", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.$patch((state) => {
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 2;
      state.character.skills[2].skillLevel = 3;
      state.character.skills[3].skillLevel = 4;
      state.character.totalPoints = 25;
      state.character.characterName = "Test Character";
      for (const skill of state.character.skills) {
        skill.skillName = "Test Skill Name";
      }
    });

    expect(myTohSkillBuilder.totalUsedPoints).toBe(10);

    expect(myTohSkillBuilder.character.totalPoints).toBe(25);

    for (const skill of myTohSkillBuilder.character.skills) {
      expect(skill.skillName).toBe("Test Skill Name");
    }

    expect(myTohSkillBuilder.character.characterName).toBe("Test Character");

    myTohSkillBuilder.resetAll();

    expect(myTohSkillBuilder.totalUsedPoints).toBe(0);

    expect(myTohSkillBuilder.character.totalPoints).toBe(20);

    expect(myTohSkillBuilder.character.characterName).toBe("");

    for (const [index, skill] of myTohSkillBuilder.character.skills.entries()) {
      expect(skill.skillName).toBe(defaultCharacter.skills[index].skillName);
    }
  });

  it("returns open character`s totalPoints to template default", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.$patch((state) => {
      state.character.totalPoints = 50;
    });

    myTohSkillBuilder.resetTotalPoints();

    expect(myTohSkillBuilder.character.totalPoints).toBe(
      defaultCharacter.totalPoints
    );
  });

  it("updates a character already in savedCharacters but not saveCharacter is called", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.saveCharacter();

    myTohSkillBuilder.$patch((state) => {
      state.character.characterName = "Test Character";
    });

    expect(myTohSkillBuilder.savedCharacters[0].characterName).toBe(
      "Unnamed 1"
    );

    myTohSkillBuilder.saveCharacter();

    expect(myTohSkillBuilder.savedCharacters[0].characterName).toBe(
      "Test Character"
    );
  });

  it('creates an "Untitled (x)" name based on largest [Untitled x] in savedCharacters', () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.saveCharacter();

    expect(myTohSkillBuilder.savedCharacters[0].characterName).toBe(
      "Unnamed 1"
    );
  });

  it("deletes a character from savedCharacters", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.saveCharacter();
    myTohSkillBuilder.newCharacter();
    myTohSkillBuilder.saveCharacter();
    myTohSkillBuilder.newCharacter();
    myTohSkillBuilder.saveCharacter();

    expect(myTohSkillBuilder.savedCharacters.length).toBe(3);

    const testId = myTohSkillBuilder.savedCharacters[1].id;

    expect(
      myTohSkillBuilder.savedCharacters.filter(
        (character) => character.id === testId
      ).length
    ).toBe(1);

    myTohSkillBuilder.deleteCharacter(testId);

    expect(myTohSkillBuilder.savedCharacters.length).toBe(2);

    expect(
      myTohSkillBuilder.savedCharacters.filter(
        (character) => character.id === testId
      ).length
    ).toBe(0);
  });

  it("opens a character based on id", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.saveCharacter();
    myTohSkillBuilder.newCharacter();
    myTohSkillBuilder.saveCharacter();
    myTohSkillBuilder.newCharacter();
    myTohSkillBuilder.saveCharacter();

    expect(myTohSkillBuilder.savedCharacters.length).toBe(3);

    const testId = myTohSkillBuilder.savedCharacters[1].id;

    myTohSkillBuilder.openCharacter(testId);

    expect(myTohSkillBuilder.character.id).toBe(testId);
  });
});
