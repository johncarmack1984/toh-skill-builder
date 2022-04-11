import { vi, describe, it, expect, beforeEach, beforeAll } from "vitest";
import { migrationSetup } from "../migration-setup";
import { migrationRun } from "../migration-run";
import type { skill00, skills00 } from "env";
import storage from "mock-local-storage";
import { setActivePinia, createPinia } from "pinia";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";

const testSkill00: skills00 = [
  {
    name: "Test Skill",
    value: 0,
  } as skill00,
];

//const localStorage = mockLocalStorage;

describe("migrationSetup", () => {
  beforeAll(() => {
    storage;
  });
  beforeEach(() => {
    setActivePinia(createPinia());
    const myTohSkillBuilder = myTohSkillBuilderStore();
    myTohSkillBuilder.$reset();
    localStorage.clear();
  });

  it("converts type skills00 to type tohSkillBuilder", async () => {
    const myTohSkillBuilder = await myTohSkillBuilderStore();
    await migrationSetup();
    migrationRun(myTohSkillBuilder, {
      skills: JSON.parse(localStorage.skills),
    });
  });
});

/*

Unfinished tests:

  it("converts type total00 to type tohSkillBuilder", () => {
    migrationSetup();
  });
  it("converts type character00 to type tohSkillBuilder", () => {
    migrationSetup();
  });
  it("converts type savedCharacters00 to type tohSkillBuilder", () => {
    migrationSetup();
  });


*/
