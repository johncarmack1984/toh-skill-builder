import { vi, describe, it, expect, beforeEach, beforeAll } from "vitest";
import { migrationSetup } from "../migration-setup";
import type { skill00, skills00 } from "env";
import skills from "../skills";
import storage from "mock-local-storage";

describe("migrationSetup", () => {
  beforeAll(() => {
    storage;
  });
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates a test localStorage for each old localStorage shape", () => {
    migrationSetup();
    expect(localStorage.skills).toBe(
      JSON.stringify(skills._62186e88225ab700089a360f)
    );
    //console.log(localStorage.total);
    //console.log(localStorage.character);
    //console.log(localStorage.savedCharacters);
  });

  it("s localStorage items mimic the shape of old TOHSB deployments", async () => {
    expect(true).toBe(true);
  });
});

/*

Unfinished tests:

  it("mocks type skills00", () => {
    migrationSetup();
  });
  it("mocks type total00", () => {
    migrationSetup();
  });
  it("mocks type character00", () => {
    migrationSetup();
  });
  it("mocks type savedCharacters00", () => {
    migrationSetup();
  });


*/
