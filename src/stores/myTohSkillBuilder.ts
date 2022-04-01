import { defaultBrettOwlHouseCharacter } from "@/characterTemplates/brettOwlhouseDefault";
import { defineStore, acceptHMRUpdate, type StateTree } from "pinia";

//
//
//      Default Skill Builder State
//      and associated getters & actions
//
//

export const myTohSkillBuilderStore = defineStore({

  id: "myTohSkillBuilder",

  
  state: () =>
    ({
      character: { 
        ...defaultBrettOwlHouseCharacter,
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

    findCharacterById(state) {
      const characterId: string = this.character.id;
      return (
        state.savedCharacters.find((character) => {
          return character.id === characterId;
        }) || false
      );
    },

    
  },
 
  
  actions: {
    generateCharacterId() { return Math.random().toString(36).slice(2) },
    saveCharacter() {
      if (!this.findCharacterById) {
        return this.$patch((state) => {
          state.savedCharacters.push(JSON.parse(JSON.stringify(state.character)));
          state.character = {
            ...defaultBrettOwlHouseCharacter,
            id: this.generateCharacterId(),
          };
        });
      } else {
        return this.updateCharacter()
      }
    },
    openCharacter() {
      console.log("open character");
    },
    updateCharacter() {
      console.log(JSON.stringify(this));
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
