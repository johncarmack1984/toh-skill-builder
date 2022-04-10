<template>
  <div class="z-50 text-left pb-1 relative flex flex-row">
    <MenuActual v-for="(menu, index) in menus" :key="index" :menu="menu" />
  </div>
</template>

<script setup lang="ts">
import MenuActual from "./MenuActual.vue";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";
import { computed } from "vue";
const myTohSkillBuilder = myTohSkillBuilderStore();

const menus = computed(() => {
  return [
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
          },
        },
        {
          label: "saved characters...",
          type: "subheading",
          action: undefined,
        },
        ...myTohSkillBuilder.savedCharacters.map((character) => {
          return {
            label: character.characterName,
            type: "character",
            open: () => {
              myTohSkillBuilder.openCharacter(character.id);
            },
            delete: () => {
              myTohSkillBuilder.deleteCharacter(character.id);
            },
          };
        }),
      ],
    },
    {
      label: "reset",
      items: [
        {
          label: "scores",
          type: "button",
          action: () => {
            myTohSkillBuilder.resetScores();
          },
        },
        {
          label: "total points",
          type: "button",
          action: () => {
            myTohSkillBuilder.resetTotalPoints();
          },
        },
        {
          label: "character name",
          type: "button",
          action: () => {
            myTohSkillBuilder.resetCharacterName();
          },
        },
        {
          label: "skill names",
          type: "button",
          action: () => {
            myTohSkillBuilder.resetSkillNames();
          },
        },
        {
          label: "all",
          type: "button",
          action: () => {
            myTohSkillBuilder.resetAll();
          },
        },
      ],
    },
  ];
});
</script>
