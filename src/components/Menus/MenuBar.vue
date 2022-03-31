<script setup lang="ts">
import MenuActual from "./MenuActual.vue";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";

const myTohSkillBuilder = myTohSkillBuilderStore();

console.log();

const menus = [
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
      {
        label: "Saved Character Name",
        type: "button",
        action: () => {
          console.log("saved character name");
        },
      },
    ],
  },
  {
    label: "reset",
    items: [
      {
        label: "all",
        type: "button",
        action: () => {
          console.log("resetAll");
        },
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
