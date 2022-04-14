import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { migrationSetup } from "../migration-setup";
import skills from "../skills";
import character from "../character";
import savedCharacters from "../savedCharacters";
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
    expect(parseInt(localStorage.total)).toBe(20);
    expect(JSON.parse(localStorage.character)).toEqual(
      character._4e2b9197daa2aeccb4caf39ac052b96fe1f1f49d
    );
    expect(JSON.parse(localStorage.savedCharacters)).toEqual(
      savedCharacters._4e2b9197daa2aeccb4caf39ac052b96fe1f1f49d
    );
  });
});
