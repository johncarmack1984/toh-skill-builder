<script setup lang="ts">
import { tohSkillBuilderStore } from "@/stores/tohSkillBuilder";
import { computed } from "vue";
import Menu from "./Menu.vue";
const store = tohSkillBuilderStore();

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
            label: character.name,
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
            store.resetname();
          },
        },
        {
          label: "skill names",
          type: "button",
          action: () => {
            store.resetnames();
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
    <Menu
      v-for="(menu, index) in menus"
      :key="index"
      :menu="menu"
      :data-testid="`menu-actual-component-${index}`"
    />
  </div>
</template>
