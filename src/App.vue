<script setup lang="ts">
import TheMenuBar from "@/components/Menus/TheMenuBar.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div
    class="max-w-md mb-4 pb-4 mx-auto text-center bg-white rounded-xl shadow-md md:max-w-2xl"
  >
    <TheMenuBar />
    <RouterView />
  </div>
  <TheFooter />
</template>
