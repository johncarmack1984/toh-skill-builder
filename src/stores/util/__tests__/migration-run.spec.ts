import { describe, it, beforeEach, beforeAll } from "vitest";
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
    const myTohSkillBuilder = myTohSkillBuilderStore();
    myTohSkillBuilder.$reset();
    localStorage.clear();
  });

  it("converts type skills00 to type tohSkillBuilder", async () => {
    const myTohSkillBuilder = await myTohSkillBuilderStore();
    migrationSetup();
    migrationRun(myTohSkillBuilder);
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
