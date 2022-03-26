<script lang="ts">
import { RouterView } from "vue-router";
import MenuBar from './components/Menus/MenuBar.vue';
import Footer from './components/Footer.vue';
import { defineComponent } from "vue";
import { useUserStore } from './stores/user';

export default defineComponent({
  setup() {
      const user = useUserStore();
      //user.$subscribe()
    return { user }
  },
  components: {
    MenuBar,
    RouterView,
    Footer
  },
  watch: {
    /*
    "character": {
      deep: true,
      handler: function (after) {
        localStorage.setItem("character", JSON.stringify(after));
      },
    },
     "savedCharacters": {
      deep: true,
      handler: function (after) {
        localStorage.setItem("savedCharacters", JSON.stringify(after));
      },
    }, */ 
  },  
  mounted() {
  }
})
</script>

<template>
  <div class="max-w-md mb-4 pb-4 mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
    <MenuBar :user="user" />
    <RouterView />
  </div>
  <Footer />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

function mutation(mutation: any, state: any) {
  throw new Error("Function not implemented.");
}
