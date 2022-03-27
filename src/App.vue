<script lang="ts">
import { RouterView } from "vue-router";
import MenuBar from './components/Menus/MenuBar.vue';
import Footer from './components/Footer.vue';
import { defineComponent } from "vue";
import { useUserStore } from './stores/user';
import { getActivePinia, MutationType } from "pinia";

export default defineComponent({
  setup() {
      const user = useUserStore();
      const pinia = getActivePinia()    

    return { user, pinia }
  },
  components: {
    MenuBar,
    RouterView,
    Footer
  },
  watch: {
    "pinia.state.value.character": {
      // sync the user's open character with the app's openCharacter
      deep: true,
      handler: function () {
        this.user.$patch((state) => {
          state.openCharacter = this.pinia?.state.value.character
        })
      }
    },
    /* pinia.state, (state) => { localStorage.setItem('my-toh-skill-builder', JSON.stringify(state)) } */    
  },  
  
  mounted() {
  }
})
</script>

<template>
  <div class="max-w-md mb-4 pb-4 mx-auto text-center bg-white rounded-xl shadow-md md:max-w-2xl">
    <MenuBar :user="user" />
    <RouterView />
  </div>
  <Footer />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
