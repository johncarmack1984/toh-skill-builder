import { defaultCharacter } from "@/characterTemplates/TheDefaultCharacterTemplate";
import { defineStore, acceptHMRUpdate, type StateTree } from "pinia";
import { useStorage } from "@vueuse/core";
import type { character } from "env";

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
    //
    //
    //create
    //
    //

    saveCharacter() {
      // if this character is not in savedCharacters
      if (isVariableUnset(this.character.name)) {
        this.character.name = this.generatename();
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
    generatename() {
      return (
        "Unnamed " +
        (this.savedCharacters
          // get just characters named "*Unnamed*"
          .filter((character: { name: string | string[] }) =>
            character.name.includes("Unnamed")
          )
          // get just the integers
          .flatMap((character: { name: string }) =>
            parseInt(character.name.replace(/\D/g, ""))
          )
          // return the largest number
          .reduce((cur: number, prev: number) => {
            return cur > prev ? cur : prev;
          }, 0) +
          1)
      );
    },

    //
    //
    //read
    //
    //

    openCharacter(id: string) {
      this.saveCharacter();
      this.$patch((state) => {
        state.character = cleanCopy(
          state.savedCharacters.find(
            (character: { id: string }) => character.id === id
          )
        );
      });
    },

    //
    //
    //update
    //
    //

    migrateCharacter(character: character, { open = false } = {}) {
      const migrated = cleanCopy({
        ...character,
        id: Math.random().toString(36).slice(2),
      });
      this.$patch((state) => {
        if (open === true) {
          state.character = migrated;
        } else {
          state.savedCharacters.push(migrated);
        }
      });
      return true;
    },
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
        for (const [index] of state.character.skills.entries()) {
          state.character.skills[index].skillLevel = 0;
        }
      });
    },

    resetTotalPoints() {
      this.$patch((state) => {
        state.character.totalPoints = defaultCharacter.totalPoints;
      });
    },

    resetname() {
      this.$patch((state) => {
        state.character.name = defaultCharacter.name;
      });
    },

    resetnames() {
      this.$patch((state) => {
        for (const [index, skill] of state.character.skills.entries()) {
          skill.name = defaultCharacter.skills[index].name;
        }
      });
    },

    resetAll() {
      this.resetScores();
      this.resetTotalPoints();
      this.resetname();
      this.resetnames();
    },

    //
    //
    //delete
    //
    //

    deleteCharacter(id: string) {
      this.$patch((state) => {
        state.savedCharacters.splice(
          state.savedCharacters.findIndex((character) => character.id === id),
          1
        );
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(myTohSkillBuilderStore, import.meta.hot)
  );
}

function isVariableUnset(variable: unknown) {
  return (
    variable === "" || typeof variable === "undefined" || variable === null
  );
}

export function cleanCopy(character) {
  return JSON.parse(JSON.stringify(character).replace(/\\/g, ""));
}
