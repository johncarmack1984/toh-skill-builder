const defaultBrettSkillNames = [
    "Physique / Resist", 
    "Willpower",
    "Fight",
    "Shoot",
    "Strength",
    "Acrobatics / Dodge", 
    "Flying", 
    "Bile / Demonics",
    "Craft", 
    "Stealth",
    "Notice / Perception",
    "Persuasion", 
    "Deception", 
    "Intimidation",
    "Performance",
    "Empathy", 
    "Intelligence",
    "Lore", 
    "Resources", 
    "Contacts", 
    "Nature", 
    "Medicine", 
]

const defaultBrettSkillList = []

for (const [index, skillName] of defaultBrettSkillNames.entries()) {
    defaultBrettSkillList.push( { id: index, skillName, skillLevel: 0 } )
}

export const defaultBrettOwlHouseCharacter = { 
    characterName: "",
    totalPoints: 20,
    skills: defaultBrettSkillList,
}
