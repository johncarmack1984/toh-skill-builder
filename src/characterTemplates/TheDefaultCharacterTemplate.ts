import { defaultBrettSkillNames } from "./brettOwlHouseDefault";
import type { skill, character } from "env";

const defaultSkillNames = defaultBrettSkillNames;

const defaultSkillList = [];

for (const [index, skillName] of defaultSkillNames.entries()) {
  defaultSkillList.push({ id: index, skillName, skillLevel: 0 } as skill);
}

export const defaultCharacter = {
  characterName: "",
  totalPoints: 20,
  skills: defaultSkillList,
} as character;
