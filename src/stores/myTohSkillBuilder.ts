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
          .filter((character: { characterName: string | string[] }) =>
            character.characterName.includes("Unnamed")
          )
          // get just the integers
          .flatMap((character: { characterName: string }) =>
            parseInt(character.characterName.replace(/\D/g, ""))
          )
          // return the largest number
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
          this.savedCharacters.find(
            (character: { id: string }) => character.id === id
          )
        );
      });
    },

    //update

    migrateCharacter(character: character, { open = false } = {}) {
      // this works; you're just using the console to check migrations
      // until you're done writing them
      const migrated = JSON.parse(
        JSON.stringify({
          ...character,
          id: Math.random().toString(36).slice(2),
        }).replace(/\\/g, "")
      );
      this.$patch((state) => {
        if (open === true) {
          state.character = migrated;
        } else {
          state.savedCharacters.push(migrated);
        }
      });
      return true;
      /*
      console.log(
        `store.migrateCharacter(\n\n${JSON.stringify({
          ...character,
          id: Math.random().toString(36).slice(2),
        }).replace(/\\/g, "")}\n\n);`
      );
      return true;
      */
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

function cleanCopy(character) {
  return JSON.parse(JSON.stringify(character));
}
