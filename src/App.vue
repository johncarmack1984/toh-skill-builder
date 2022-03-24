<script lang="ts">
import { RouterView } from "vue-router";
import MenuBar from './components/MenuBar.vue';

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    MenuBar,
    RouterView
  },
  setup() {

  }
})
</script>

<template>
  <div class="max-w-md mb-4 pb-4 mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
    <MenuBar />
    <RouterView />
  </div>
</template>

<style>

</style>
