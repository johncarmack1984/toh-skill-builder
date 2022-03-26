import { defineStore, acceptHMRUpdate, type StateTree } from "pinia";
import { useStorage } from '@vueuse/core';
import type { Character } from './character';
import { useCharacterStore } from './character';
import type { Ref } from "vue";

interface Prefs {
  localStorageSize: number
}

export interface User {
  id: string,
  username: string,
  openCharacter: object,
  savedCharacters: [],
  prefs: Prefs,
  undoHistory: [],
}


interface UserLocalStorage {
  useStorage(s: string,user: User): Ref<User>,
}


export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userLocalStorage: useStorage(
      'my-toh-skill-builder', {
      id: String,
      username: String,
      openCharacter: Object,
      savedCharacters: [],
      prefs: {
        localStorageSize: 0,
      },
    }
    ),
  }) as StateTree,
  getters: {

  },
  actions: {

    deleteAllMyStuff() {

      // done? maybe force a reload      
      // remove all proof of this app's existence from your device, for a few milliseconds.
      // old data is replaced with a blank slate.
      // (emergencies only, cannot be undone)
      // localStorage.removeItem('my-toh-skill-builder'); 
      this.$reset()

    },         
    migrateOldLocalStorageCharacters() {
      // what's in localStorage?
      // console.log('localStorage: ' + JSON.stringify(localStorage))    
      // which permutation does it have?
      // code
      // copy those permutations to the new model  
      // code
      //trying to get here:
      /*localStorage.removeItem('skills');      
      localStorage.removeItem('total');      
      localStorage.removeItem('character');      
      localStorage.removeItem('savedCharacters');
      localStorage.removeItem('size');*/
    },
    setLocalStorageSize() {
      console.log('localStorage will be set here in the future')
      // for use when it's time to implement an undo... I waste dtoo much time on it today
      /*
      console.log(JSON.stringify(this.$state.userLocalStorage.prefs))
      console.log(/*JSON.stringify/this.userLocalStorage.prefs.localStorageSize)
      const userLocalStorage: UserLocalStorage = this.userLocalStorage
      //this.deleteAllMyStuff();
      // if localStoage exists, and user's cache is set to zero (the default),
      /*
      if (localStorage && ((this.$state.userLocalStorage.prefs.localStorageSize === 0) || (this.$state.userLocalStorage.prefs.localStorageSize === undefined))) {
        var i = 0;
        try {
            // test up to 10 MB 
            for (i = 250; i <= 10000; i += 250) {
                localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
            }
        } catch (e) {
            // delete test object
            localStorage.removeItem('test');
            // set user's localStorage pref, 
            this.$state.prefs.localStorageSize = i - 250;    
        }        
      }
      else {
        // no localstorage or cache size alrady set
      }
      */
    },
    createCharacter(character: Character) { 
      //const characterStore = useCharacter()
      //const savedCharacters: array = this.userLocalStorage.savedCharacters)
      //this.userLocalStorage.savedCharacters.push(character); 
      console.log("creating to be implemented") 
    },    
    saveCharacter() {
      console.log('saving to be implemented')
      // if character is unnamed, give name "Unnamed (x)"
      /*if (this.isVariableUnset(this.character.name)) { 
        var unnamedArray = this.savedCharacters.filter(function (character) { return character.name.includes("Unnamed ")})      
        var unnamedIndex = unnamedArray.length
        this.character.name = "Unnamed " + unnamedIndex
      }
      console.log(this.character.name + " saving")
        if (this.isVariableUnset(this.character.id)) {
          this.character.id = Math.random().toString(36).slice(2);
          console.log("id generated " + this.character.id)
          this.createCharacter(this.character);
        } 
        else {
          console.log("id is " + this.character.id + " and tested valid")
          var savedIndex = this.savedCharacters.findIndex(obj => { return obj.id === this.character.id } ) 
          if (savedIndex === -1) { 
            console.log("...but character did not exist in savedCharacters. \n create ")
            this.createCharacter(this.character) 
          }
          else { 
            console.log("update")
            this.updateCharacter(savedIndex)
          }
        }
        console.log("saved")
      },
      */      
    },
    openCharacter() {},
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

const oldLocalStorageNames = [ 
  'skills',
  'total',
  'character',
  'savedCharacters',
]