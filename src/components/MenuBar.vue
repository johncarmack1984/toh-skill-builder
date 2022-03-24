<script lang="ts">
import { defineComponent } from "vue";
import Menu from './Menu.vue';
/* import { RouterLink } from "vue-router"; */

export default defineComponent({
    components: {
        Menu,
        /* RouterLink, */
    },
    setup() {

    }
})
</script>

<template>
  <header>


    <div class="wrapper">
      <nav>
          <Menu menu="file" />
          <!--RouterLink "share character, URL will contain character values which will auto-save to localStorage"-->
      </nav>
    </div>
  </header>    
    
</template>