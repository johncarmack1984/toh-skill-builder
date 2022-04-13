import { defaultBrettnames } from "./brettOwlHouseDefault";
import type { skill, character } from "env";

const defaultnames = defaultBrettnames;

const defaultSkillList = [];

for (const [index, name] of defaultnames.entries()) {
  defaultSkillList.push({ id: index, name, skillLevel: 0 } as skill);
}

export const defaultCharacter = {
  name: "",
  totalPoints: 20,
  skills: defaultSkillList,
} as character;
