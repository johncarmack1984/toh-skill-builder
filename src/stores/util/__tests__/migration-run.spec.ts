import { describe, it, beforeEach, beforeAll, expect } from "vitest";
import { migrationSetup } from "../migration-setup";
import { migrationRun } from "../migration-run";
import storage from "mock-local-storage";
import { setActivePinia, createPinia } from "pinia";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";

describe("migrationSetup", () => {
  beforeAll(() => {
    storage;
  });
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = myTohSkillBuilderStore();
    store.$reset();
    localStorage.clear();
  });

  it("converts type skills00 to type tohSkillBuilder", async () => {
    const store = await myTohSkillBuilderStore();

    migrationSetup();
    migrationRun(store);

    expect(store.character.characterName).toBe("Sample Character 00");
    expect(store.savedCharacters.length).toBe(5);
    expect(store.savedCharacters[0].characterName).toBe("Unnamed 1");
    expect(store.savedCharacters[1].characterName).toBe("Sample Character 00");
  });
});
