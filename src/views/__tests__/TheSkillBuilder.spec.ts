import { describe, expect, it } from "vitest";
import TheSkillBuilder from "../TheSkillBuilder.vue";

describe("TheSkillBuiilder", () => {
  it("finds true to be true", () => {
    expect(true).toBe(true);
  });
});

/* unfinished tests 

it("displays value of skill")
it("increments when '+' is pushed")
it("decrements when '--' is pushed")
it("will not decrease lower than min legend level")
it("will not increase higher than max legend level")
it("will not increase when total remaining points is less than 1")

fun feature to consider:

it forces user to build a pyramid (eg, cannot go above level 1 unless there are 2 level 1s for it to stand on, etc)
(maybe as a config option)

*/
