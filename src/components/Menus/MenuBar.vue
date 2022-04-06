<script setup lang="ts">
import MenuActual from "./MenuActual.vue";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";
import { ref, onMounted,computed, watch } from "vue";

const myTohSkillBuilder = myTohSkillBuilderStore();
/*
myTohSkillBuilder.savedCharacters.map(character => console.log(character));
*/
let menus: { label: string; items: any[]; }[] = [];
let savedCharactersMenu = ref([]);
//,...myTohSkillBuilder.savedCharacters

let savedCharacters = ['bill','tom'];
onMounted({
  savedCharacters: ['bill','ted','george']
});
/*
myTohSkillBuilder.$subscribe((mutation, state) => {
  console.log(mutation.type),
  console.log(mutation.storeId)
  console.log(mutation)
  //console.log(state.savedCharacters.map((character,index) => { JSON.stringify(character) }));
})
*/
/*
watch(myTohSkillBuilder.savedCharacters, async (newSavedCharacters, oldSavedCharacters) => {
  newSavedCharacters.map((character, index) => { console.log(character.characterName) })
})
*/
savedCharactersMenu = savedCharacters.map((character,index) => { 
  return(
    { label: character, type: "button", action: () => { console.log(character) } }
  )
});

const savedCharactersMenuComputed = computed({
  get() {
    return savedCharacters
  },
  set(newValue) {
    savedCharacters.map((character,index) => { 
      return(
        { label: character, type: "button", action: () => { /*console.log(character)*/ } }
      )
    })
  }
});

menus = [
  {
    label: "file",
    items: [
      {
        label: "new character",
        type: "button",
        action: () => {
          myTohSkillBuilder.newCharacter();
        },
      },
      {
        label: "save character",
        type: "button",
        action: () => {
          myTohSkillBuilder.saveCharacter();
          /*console.log(JSON.stringify(myTohSkillBuilder.savedCharacters));*/
        },
      },
      {
        label: "Saved characters...",
        type: "subheading",
        action: undefined,
      },
      ...savedCharactersMenu
    ],
  },
  {
    label: "reset",
    items: [
      {
        label: "scores",
        type: "button",
        action: () => { myTohSkillBuilder.resetScores(); },
      },
      {
        label: "total points",
        type: "button",
        action: () => { myTohSkillBuilder.resetTotalPoints(); },
      },
      {
        label: "character name",
        type: "button",
        action: () => { myTohSkillBuilder.resetCharacterName(); },
      },
      {
        label: "skill names",
        type: "button",
        action: () => { myTohSkillBuilder.resetSkillNames(); },
      },
      {
        label: "all",
        type: "button",
        action: () => { myTohSkillBuilder.resetAll(); },
      },
    ],
  },
];
</script>

<template>
  <div class="z-50 text-left pb-1 relative flex flex-row">
    <MenuActual v-for="(menu, index) in menus" :key="index" :menu="menu" />
  </div>
</template>
