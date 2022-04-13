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
    const store = myTohSkillBuilderStore();
    store.$reset();
  });

  it("calculates total used points", () => {
    const store = myTohSkillBuilderStore();

    expect(store.totalUsedPoints).toBe(0);

    store.$patch((state) => {
      state.character.skills[0].skillLevel++;
    });

    expect(store.totalUsedPoints).toBe(1);
  });

  it("calculates remaining points", () => {
    const store = myTohSkillBuilderStore();

    expect(store.remainingPoints).toBe(
      store.character.totalPoints - store.totalUsedPoints
    );
  });

  it('adds a copy of "character" to "savedCharacters"', () => {
    const store = myTohSkillBuilderStore();

    expect(store.savedCharacters).toEqual([]);

    store.saveCharacter();

    expect(store.savedCharacters.length).toBe(1);
    expect(store.savedCharacters[0]).toBeTruthy();
  });

  it("creates a new character by setting default state", () => {
    const store = myTohSkillBuilderStore();

    store.$patch((state) => {
      state.character.name = "Test Character";
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 2;
      state.character.skills[2].skillLevel = 3;
      state.character.skills[3].skillLevel = 4;
    });

    expect(store.character.name).toBe("Test Character");

    expect(store.totalUsedPoints).toBe(10);

    expect(store.savedCharacters).toEqual([]);

    store.newCharacter();

    expect(store.character.skills[0].skillLevel).toBe(0);

    expect(store.totalUsedPoints).toBe(0);

    expect(store.savedCharacters.length).toBe(1);
  });

  it("resets scores", () => {
    const store = myTohSkillBuilderStore();

    store.$patch((state) => {
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 2;
      state.character.skills[2].skillLevel = 3;
      state.character.skills[3].skillLevel = 4;
    });

    expect(store.totalUsedPoints).toBe(10);

    store.resetScores();

    expect(store.totalUsedPoints).toBe(0);
  });

  it("resets total points", () => {
    const store = myTohSkillBuilderStore();

    store.$patch((state) => {
      state.character.totalPoints = 25;
    });

    expect(store.character.totalPoints).toBe(25);

    store.resetTotalPoints();

    expect(store.character.totalPoints).toBe(20);
  });

  it("resets character name", () => {
    const store = myTohSkillBuilderStore();

    store.$patch((state) => {
      state.character.characterName = "Test Character";
    });

    expect(store.character.characterName).toBe("Test Character");

    store.resetCharacterName();

    expect(store.character.characterName).toBe("");
  });

  it("resets skill names", () => {
    const store = myTohSkillBuilderStore();

    store.$patch((state) => {
      for (const skill of state.character.skills) {
        skill.skillName = "Test Skill Name";
      }
    });

    for (const skill of store.character.skills) {
      expect(skill.skillName).toBe("Test Skill Name");
    }

    store.resetSkillNames();

    for (const [index, skill] of store.character.skills.entries()) {
      expect(skill.skillName).toBe(defaultCharacter.skills[index].skillName);
    }
  });

  it("resets all together", () => {
    const store = myTohSkillBuilderStore();

    store.$patch((state) => {
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

    expect(store.totalUsedPoints).toBe(10);

    expect(store.character.totalPoints).toBe(25);

    for (const skill of store.character.skills) {
      expect(skill.skillName).toBe("Test Skill Name");
    }

    expect(store.character.characterName).toBe("Test Character");

    store.resetAll();

    expect(store.totalUsedPoints).toBe(0);

    expect(store.character.totalPoints).toBe(20);

    expect(store.character.characterName).toBe("");

    for (const [index, skill] of store.character.skills.entries()) {
      expect(skill.skillName).toBe(defaultCharacter.skills[index].skillName);
    }
  });

  it("returns open character`s totalPoints to template default", () => {
    const store = myTohSkillBuilderStore();

    store.$patch((state) => {
      state.character.totalPoints = 50;
    });

    store.resetTotalPoints();

    expect(store.character.totalPoints).toBe(defaultCharacter.totalPoints);
  });

  it("updates a character already in savedCharacters but not saveCharacter is called", () => {
    const store = myTohSkillBuilderStore();

    store.saveCharacter();

    store.$patch((state) => {
      state.character.characterName = "Test Character";
    });

    expect(store.savedCharacters[0].characterName).toBe("Unnamed 1");

    store.saveCharacter();

    expect(store.savedCharacters[0].characterName).toBe("Test Character");
  });

  it('creates an "Untitled (x)" name based on largest [Untitled x] in savedCharacters', () => {
    const store = myTohSkillBuilderStore();

    store.saveCharacter();

    expect(store.savedCharacters[0].characterName).toBe("Unnamed 1");
  });

  it("deletes a character from savedCharacters", () => {
    const store = myTohSkillBuilderStore();

    store.saveCharacter();
    store.newCharacter();
    store.saveCharacter();
    store.newCharacter();
    store.saveCharacter();

    expect(store.savedCharacters.length).toBe(3);

    const testId = store.savedCharacters[1].id;

    expect(
      store.savedCharacters.filter((character) => character.id === testId)
        .length
    ).toBe(1);

    store.deleteCharacter(testId);

    expect(store.savedCharacters.length).toBe(2);

    expect(
      store.savedCharacters.filter((character) => character.id === testId)
        .length
    ).toBe(0);
  });

  it("opens a character based on id", () => {
    const store = myTohSkillBuilderStore();

    store.saveCharacter();
    store.newCharacter();
    store.saveCharacter();
    store.newCharacter();
    store.saveCharacter();

    expect(store.savedCharacters.length).toBe(3);

    const testId = store.savedCharacters[1].id;

    store.openCharacter(testId);

    expect(store.character.id).toBe(testId);
  });
});

/*

Unwritten test

migrateCharacter()

*/
