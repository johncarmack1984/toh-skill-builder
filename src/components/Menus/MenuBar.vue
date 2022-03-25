<script lang="ts">
import { defineComponent } from "vue";
import Menu from './MenuActual.vue';
import type { Menu, MenuBank } from './MenuActual.vue';
/* import { RouterLink } from "vue-router"; */

export default defineComponent({
    components: {
        Menu,
        /* RouterLink, */
    },
    setup() {
        const menus: MenuBank = [ 
            { 
                'label': 'file',
                'items': [
                    { 'label': 'new', 'action': "" },
                ],
            },
            {
                'label': 'reset',
                'items': [
                    { 'label': 'all', 'action': "" },
                ],
            },
        ]
        return {
            menus,
        }
    }
})
</script>

<template>
    <div class="z-50 text-left pb-1 relative flex flex-row">
          <Menu v-for="(menu, index) in menus" :key="index" :menu="menu" />
          <!--RouterLink "share character, URL will contain character values which will auto-save to localStorage"-->    
    </div>
</template>