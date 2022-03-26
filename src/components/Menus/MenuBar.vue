<script lang="ts">
import { defineComponent } from "vue";
import { useMenuStore } from '../../stores/menu'
import MenuActual from './MenuActual.vue';
/* import { RouterLink } from "vue-router"; */


export default defineComponent({
    props: ['user'],
    components: {
        MenuActual
        /* RouterLink, */
    },
    setup(props) {
        const menus = useMenuStore()              
        return {
            menus,
            props,
        }
    },
    mounted() {
        //console.log(this.menus.$state);
    }
})
</script>

<template>
    <div class="z-50 text-left pb-1 relative flex flex-row">
          <MenuActual v-for="(menu, index) in menus.$state" :key="index" :menu="menu" />
          <!--RouterLink "share character, URL will contain character values which will auto-save to localStorage"-->    
    </div>
</template>