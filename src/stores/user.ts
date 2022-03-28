import { defineStore, acceptHMRUpdate, type StateTree } from "pinia";
import { useStorage } from '@vueuse/core';

const oldLocalStorageNames = [ 
  'skills',
  'total',
  'character',
  'savedCharacters',
]

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    openCharacter: useStorage('toh-open-character',{}),
    savedCharacters: useStorage('toh-saved-characters',[]),

  }) as StateTree,
  getters: {
 
  },
  actions: {

  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

