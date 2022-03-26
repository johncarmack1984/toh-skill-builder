import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage } from '@vueuse/core';
import type Character from './character';
import { useCharacterStore } from './character';

interface Prefs {
  localStorageSize: number
}

interface TOHLocalStorage {
  id: string,
  username: string,
  openCharacter: object,
  savedCharacters: [],
  prefs: Prefs,
  undoHistory: [],
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
  }) as unknown as TOHLocalStorage,
  getters: {

  },
  actions: {

    deleteAllMyStuff() {
      // done? maybe force a reload      
      // remove all proof of this app's existence from your device, for a few milliseconds.
      // old data is replaced with a blank slate.
      // (emergencies only, cannot be undone)
      localStorage.removeItem('my-toh-skill-builder'); 

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
      // if localStoage exists, and user's cache is set to zero (the default),
      if (localStorage && (this.userLocalStorage.prefs.localStorageSize === 0)) {
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
            this.userLocalStorage.prefs.localStorageSize = i - 250;    
        }        
      }
      else {
        // no localstorage or cache size alrady set
      }
    },
    createCharacter(character: Character) { 
      //const characterStore = useCharacter()
      console.log(this.userLocalStorage.savedCharacters)
      //this.userLocalStorage.savedCharacters.push(character); 
      console.log("character " + character.name + " added to savedCharacters") 
    },



    
    saveCharacter() {},
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