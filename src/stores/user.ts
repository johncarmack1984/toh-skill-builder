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

interface SavedCharacters {
  [index: number]: Character
}


interface UserLocalStorage {
  useStorage(s: string,user: User): Ref<User>,
}


export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    id: String,
    username: String,
    openCharacter: Object,
    savedCharacters: [{'characterName': 'Bobby Jo'}],
    prefs: {
      localStorageSize: 0,
    },
  }) as StateTree,
  getters: {
    getCharacter(id: string) {

    }
  },
  actions: {
    saveCharacter(character: any) { this.state.savedCharacters.push(character) }
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