<template>
  <div class="z-50 text-left pb-1 relative flex flex-row">
    <MenuActual
      v-for="(menu, index) in menus"
      :key="index"
      :menu="menu"
      :data-testid="'menu-openbutton-' + (index + 1)"
    />
  </div>
</template>

<script setup lang="ts">
import MenuActual from "./MenuActual.vue";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";
import { computed } from "vue";
const myTohSkillBuilder = myTohSkillBuilderStore();

const savedCharactersMenu = computed(() => {
  return myTohSkillBuilder.savedCharacters.map((character) => {
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
  });
});

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
          label: "Saved characters...",
          type: "subheading",
          action: undefined,
        },
        ...savedCharactersMenu.value,
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
