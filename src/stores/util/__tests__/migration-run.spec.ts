import { describe, it, beforeEach, beforeAll, expect } from "vitest";
import { migrationSetup } from "../migration-setup";
import { migrationRun } from "../migration-run";
import storage from "mock-local-storage";
import { setActivePinia, createPinia } from "pinia";
import { tohSkillBuilderStore } from "@/stores/tohSkillBuilder";

describe("migrationSetup", () => {
  beforeAll(() => {
    storage;
  });
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = tohSkillBuilderStore();
    store.$reset();
    localStorage.clear();
  });

  it("converts type skills00 to type tohSkillBuilder", async () => {
    const store = await tohSkillBuilderStore();

    migrationSetup();
    migrationRun(store);

    expect(store.character.name).toBe("Sample Character 00");
    expect(store.savedCharacters.length).toBe(5);
    expect(store.savedCharacters[0].name).toBe("Unnamed 1");
    expect(store.savedCharacters[1].name).toBe("Sample Character 00");
  });
});
