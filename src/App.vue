<script lang="ts">
import { RouterView } from "vue-router";
import MenuBar from './components/Menus/MenuBar.vue';

import { defineComponent } from "vue";

export default defineComponent({
  setup() {

    return {  }
  },
  components: {
    MenuBar,
    RouterView
  },
})
</script>

<template>
  <div class="max-w-md mb-4 pb-4 mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
    <MenuBar />
    <RouterView />
  </div>
  <div class="pb-4">
    <a class="underline" target="new" href="https://github.com/johncarmack1984/toh-skill-builder">TOH Skill Builder</a> 
    by <a class="underline" href="https://github.com/johncarmack1984">John Carmack</a>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
