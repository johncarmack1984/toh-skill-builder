import type { character, skill, skills00, character00 } from "env";

export const migrationRun = (state) => {
  let skills = JSON.parse(localStorage.getItem("skills")) || null;
  let migrated;
  // mold to fit new shape
  if (skills !== null) {
    skills = formatSkills00(skills);
    migrated = {
      characterName: state.generateCharacterName(),
      totalPoints: 20,
      skills,
    };
    state.migrateCharacter(migrated);
    localStorage.removeItem("skills");
    skills = null;
  }
  let totalPoints = JSON.parse(localStorage.getItem("total")) || null;
  if (totalPoints !== null) {
    localStorage.removeItem("total");
  }
  const character: character00 =
    JSON.parse(localStorage.getItem("character")) || null;
  let characterName;
  if (character !== null) {
    skills = formatSkills00(character.skills);
    characterName = character.name || state.generateCharacterName();
    migrated = {
      characterName,
      skills,
      totalPoints,
    };
    state.migrateCharacter(migrated);
    localStorage.removeItem("character");
  }
  const savedCharacters =
    JSON.parse(localStorage.getItem("savedCharacters")) || null;
  if (savedCharacters !== null) {
    for (const character of savedCharacters) {
      characterName = character.characterName || state.generateCharacterName();
      skills = skills = formatSkills00(character.skills);
      totalPoints = character.totalPoints || 20;
      migrated = {
        characterName,
        skills,
        totalPoints,
      };
      state.migrateCharacter(migrated, { open: true });
    }
    localStorage.removeItem("savedCharacters");
  }
  skills = null;
  totalPoints = null;
};

const formatSkills00 = (skills: skills00) => {
  for (const [index, skill] of skills.entries()) {
    skills[index] = {
      id: index,
      skillName: skill.name,
      skillLevel: skill.value,
    };
  }
  if (skills[skills.length - 1].id <= 22) {
    skills.push({
      id: 22,
      skillName: "Agility",
      skillLevel: 0,
    });
  }
  return skills;
};
