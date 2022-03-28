<script setup lang="ts">
import { useUserStore } from './stores/user';
import { getActivePinia, MutationType } from "pinia";
import MenuBar from './components/Menus/MenuBar.vue';
import Footer from './components/Footer.vue';

const user = useUserStore(); 
</script>

<template>
  <div class="max-w-md mb-4 pb-4 mx-auto text-center bg-white rounded-xl shadow-md md:max-w-2xl">
    <MenuBar :user="user" />
    <RouterView />
  </div>
  <Footer />
</template>


