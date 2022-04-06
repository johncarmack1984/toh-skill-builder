import { defaultCharacter } from "@/characterTemplates/TheDefaultCharacterTemplate";
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

    findCharacterById(state) {
      const characterId: string = this.character.id;
      return (
        state.savedCharacters.find((character) => {
          return character.id === characterId;
        }) || false
      );
    },

    getCharacterIndex(state) {
      const characterId: string = this.character.id;
      if (this.findCharacterById) {
        return (
          this.savedCharacters.findIndex(character => {
            return character.id === this.character.id;
          })
        );
      }
      else return false;
    },

    isVariableUnset (variable: any) { 
      return ( variable === '' || typeof variable === 'undefined' || variable === null ) 
    },

  },  


  actions: {

    //create 

    generateCharacterId() { return Math.random().toString(36).slice(2) },
    generateCharacterName() {
      var unnamedArray = this.savedCharacters.filter(function (character: object) { 
        return character.name.includes("Unnamed ")})

      var unnamedIndex = unnamedArray.length
      this.character.name = "Unnamed " + unnamedIndex
    },

    saveCharacter() {
      // if this character is not in savedCharacters
      if (!this.findCharacterById) {
        return this.$patch((state) => {
          // add character to savedCharacters
          state.savedCharacters.push(cleanCopy(state.character));
        });
      } else {
        return this.updateCharacter()
      }
    },

    newCharacter() {
      this.saveCharacter();
      this.$patch((state) => {
        // set open character to default
        state.character = {...cleanCopy(defaultCharacter), id: this.generateCharacterId(), };
      });
    },

    //read 

    openCharacter() {
      console.log("open character");
    },



    //update

    updateCharacter() {
      this.$patch((state) => {
        state.savedCharacters[this.getCharacterIndex] = cleanCopy(state.character);
      });
    },


    resetScores() { 
      this.$patch((state) => { 
        this.character.skills.forEach((skill, index) => { 
          state.character.skills[index].skillLevel = 0 });
      });
    },

    resetTotalPoints() {       
      this.$patch((state) => {
        this.character.totalPoints = defaultCharacter.totalPoints;
      });

    },    

    resetCharacterName() {
      this.$patch((state) => {
        this.character.characterName = defaultCharacter.characterName;
      });
     },   

    resetSkillNames() {
      console.log("this one needs thinking through (skillNames)")
      this.$patch((state) => {
        // this one needs thingking through
        /* this.character.totalPoints = defaultCharacter.totalPoints; */
      });      
     },    

    resetAll() {
      this.resetScores();
      this.resetTotalPoints();
      this.resetCharacterName();
      this.resetSkillNames();
     }, 

     //delete

    deleteCharacter(id) {
      /*
      this.$patch((state) => {
        state.savedCharacters.splice(state.getCharacterIndex,1)
      }); */
      console.log("delete character not yet implemented");
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

function cleanCopy (character) { 

  return JSON.parse(JSON.stringify(character)) 

};

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(myTohSkillBuilderStore, import.meta.hot)
  );
}

