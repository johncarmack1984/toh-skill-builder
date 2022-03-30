<script setup lang="ts">
import { myTohSkillBuilderStore } from "./stores/myTohSkillBuilder";
import MenuBar from "./components/Menus/MenuBar.vue";
import TheFooter from "./components/TheFooter.vue";
import { watch, ref } from "vue";
</script>

<template>
  <div
    class="max-w-md mb-4 pb-4 mx-auto text-center bg-white rounded-xl shadow-md md:max-w-2xl"
  >
    <MenuBar />
    <RouterView />
  </div>
  <TheFooter />
</template>
