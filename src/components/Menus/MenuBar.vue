<script setup lang="ts">
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";
import { computed } from "vue";
import MenuActual from "./MenuActual.vue";
const store = myTohSkillBuilderStore();

const menus = computed(() => {
  return [
    {
      label: "file",
      items: [
        {
          label: "new character",
          type: "button",
          action: () => {
            store.newCharacter();
          },
        },
        {
          label: "save character",
          type: "button",
          action: () => {
            store.saveCharacter();
          },
        },
        {
          label: "saved characters...",
          type: "subheading",
          action: undefined,
        },
        ...store.savedCharacters.map((character) => {
          return {
            label: character.characterName,
            type: "character",
            open: () => {
              store.openCharacter(character.id);
            },
            delete: () => {
              store.deleteCharacter(character.id);
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
            store.resetScores();
          },
        },
        {
          label: "total points",
          type: "button",
          action: () => {
            store.resetTotalPoints();
          },
        },
        {
          label: "character name",
          type: "button",
          action: () => {
            store.resetCharacterName();
          },
        },
        {
          label: "skill names",
          type: "button",
          action: () => {
            store.resetSkillNames();
          },
        },
        {
          label: "all",
          type: "button",
          action: () => {
            store.resetAll();
          },
        },
      ],
    },
  ];
});
</script>

<template>
  <div class="z-50 text-left pb-1 relative flex flex-row">
    <MenuActual
      v-for="(menu, index) in menus"
      :key="index"
      :menu="menu"
      :data-testid="`menu-actual-component-${index}`"
    />
  </div>
</template>
