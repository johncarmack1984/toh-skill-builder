import { defineStore, acceptHMRUpdate, type StateTree } from "pinia";

export const myTohSkillBuilderStore = defineStore({
  id: "myTohSkillBuilder",
  state: () =>
    ({
      character: {
        characterName: "",
        totalPoints: 20,
        skills: [
          { id: 1, skillName: "Physique / Resist", skillLevel: 0 },
          { id: 2, skillName: "Willpower", skillLevel: 0 },
          { id: 3, skillName: "Fight", skillLevel: 0 },
          { id: 4, skillName: "Shoot", skillLevel: 0 },
          { id: 5, skillName: "Strength", skillLevel: 0 },
          { id: 6, skillName: "Acrobatics / Dodge", skillLevel: 0 },
          { id: 7, skillName: "Flying", skillLevel: 0 },
          { id: 8, skillName: "Bile / Demonics", skillLevel: 0 },
          { id: 9, skillName: "Craft", skillLevel: 0 },
          { id: 10, skillName: "Stealth", skillLevel: 0 },
          { id: 11, skillName: "Notice / Perception", skillLevel: 0 },
          { id: 12, skillName: "Persuasion", skillLevel: 0 },
          { id: 13, skillName: "Deception", skillLevel: 0 },
          { id: 14, skillName: "Intimidation", skillLevel: 0 },
          { id: 15, skillName: "Performance", skillLevel: 0 },
          { id: 16, skillName: "Empathy", skillLevel: 0 },
          { id: 17, skillName: "Intelligence", skillLevel: 0 },
          { id: 18, skillName: "Lore", skillLevel: 0 },
          { id: 19, skillName: "Resources", skillLevel: 0 },
          { id: 20, skillName: "Contacts", skillLevel: 0 },
          { id: 21, skillName: "Nature", skillLevel: 0 },
          { id: 21, skillName: "Medicine", skillLevel: 0 },
        ],
        id: Math.random().toString(36).slice(2),
      },
      savedCharacters: [],
    } as StateTree),
  getters: {
    totalUsedPoints(state) {
      return state.character.skills
        .filter((skill: { skillLevel: number }) => skill.skillLevel > 0)
        .reduce(
          (prev: number, cur: { skillLevel: number }) => prev + cur.skillLevel,
          0
        );
    },
    remainingPoints(state) {
      const totalUsedPoints: number = this.totalUsedPoints;
      return state.character.totalPoints - totalUsedPoints;
    },
  },
  actions: {
    saveCharacter() {
      this.$patch((state) => {
        state.savedCharacters.push(JSON.parse(JSON.stringify(state.character)));
      });
    },
    openCharacter() {
      console.log("delete character");
    },
    updateCharacter() {
      console.log("delete character");
    },
    deleteCharacter() {
      console.log("delete character");
    },
  },
});

/* when you write mutations for old store forms: 
const oldLocalStorageNames = [
    "skills",
    "total",
    "character",
    "savedCharacters",
  ];
*/

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(myTohSkillBuilderStore, import.meta.hot)
  );
}
