import { defaultCharacter } from "@/characterTemplates/TheDefaultCharacterTemplate";
import { defineStore, acceptHMRUpdate, type StateTree } from "pinia";
import { useStorage } from "@vueuse/core";

//
//
//      Default Skill Builder State
//      and associated getters & actions
//
//

export const myTohSkillBuilderStore = defineStore({
  id: "myTohSkillBuilder",

  state: () =>
    useStorage("toh-skill-builder", {
      character: {
        ...cleanCopy(defaultCharacter),
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
    //create
    saveCharacter() {
      // if this character is not in savedCharacters
      if (isVariableUnset(this.character.characterName)) {
        this.character.characterName = this.generateCharacterName();
      }
      if (
        this.savedCharacters.find(
          (character: { id: string }) => character.id == this.character.id
        ) === undefined
      ) {
        return this.$patch((state) => {
          // add character to savedCharacters
          state.savedCharacters.push(cleanCopy(state.character));
        });
      } else {
        return this.updateCharacter();
      }
    },
    newCharacter() {
      this.saveCharacter();
      this.$patch((state) => {
        // set open character to default
        state.character = {
          ...cleanCopy(defaultCharacter),
          id: Math.random().toString(36).slice(2),
        };
      });
    },
    generateCharacterName() {
      return (
        "Unnamed " +
        (this.savedCharacters
          // get just characters named "*Unnamed*"
          // eslint-disable-next-line prettier/prettier
          .filter((character: { characterName: string | string[] }) =>
            character.characterName.includes("Unnamed")
          )
          // get just the integers
          // eslint-disable-next-line prettier/prettier
          .flatMap((character: { characterName: string }) =>
            parseInt(character.characterName.replace(/\D/g, ""))
          )
          // return the largest number
          // eslint-disable-next-line prettier/prettier
          .reduce((cur: number, prev: number) => {
            return cur > prev ? cur : prev;
          }, 0) +
          1)
      );
    },
    //read

    openCharacter(id: string) {
      this.saveCharacter();
      this.$patch((state) => {
        state.character = cleanCopy(
          this.savedCharacters.find((character) => character.id === id)
        );
      });
    },

    //update

    updateCharacter() {
      this.$patch((state) => {
        state.savedCharacters[
          state.savedCharacters.findIndex(
            (character) => character.id === state.character.id
          )
        ] = cleanCopy(state.character);
      });
    },

    resetScores() {
      this.$patch((state) => {
        for (const [index] of this.character.skills.entries()) {
          state.character.skills[index].skillLevel = 0;
        }
      });
    },

    resetTotalPoints() {
      this.$patch((state) => {
        state.character.totalPoints = defaultCharacter.totalPoints;
      });
    },

    resetCharacterName() {
      this.$patch((state) => {
        state.character.characterName = defaultCharacter.characterName;
      });
    },

    resetSkillNames() {
      this.$patch((state) => {
        for (const [index, skill] of state.character.skills.entries()) {
          skill.skillName = defaultCharacter.skills[index].skillName;
        }
      });
    },

    resetAll() {
      this.resetScores();
      this.resetTotalPoints();
      this.resetCharacterName();
      this.resetSkillNames();
    },

    //delete

    deleteCharacter(id: string) {
      this.$patch((state) => {
        state.savedCharacters.splice(
          this.savedCharacters.findIndex((character) => character.id === id),
          1
        );
      });
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

function isVariableUnset(variable: unknown) {
  return (
    variable === "" || typeof variable === "undefined" || variable === null
  );
}

function cleanCopy(character) {
  return JSON.parse(JSON.stringify(character));
}

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(myTohSkillBuilderStore, import.meta.hot)
  );
}
