import { defaultBrettSkillNames } from "./brettOwlHouseDefault";

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

export type skill = {
  id: number;
  skillName: string;
  skillLevel: number;
};

export type character = {
  characterName: string;
  totalPoints: number;
  skills: array<skill>;
  id: string;
};
