import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: String,
    savedCharacters: Array,
  }),
  getters: {
  },
  actions: {
 
  },
});
