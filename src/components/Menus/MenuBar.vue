<script setup lang="ts">
import { defineComponent, reactive } from "vue";
import MenuActual from './MenuActual.vue';
import { getActivePinia } from "pinia";
import { computed } from 'vue'

const props = defineProps(['user'])
const pinia = getActivePinia()


const fileMenu = {
        label: 'file',
        items: [ { 'label': 'save character', 'action': () => { console.log(pinia) }},  ],
    }

const resetMenu = {
    label: 'reset',
    items: [ { 'label': 'button', 'action': () => { console.log('action')}} ]
}        
const menus = [ fileMenu, resetMenu ]    

</script>
<script lang="ts">
export default defineComponent({

    components: {
        MenuActual
    },
})
</script>

<template>
    <div class="z-50 text-left pb-1 relative flex flex-row">
          <MenuActual v-for="(menu, index) in menus" :key="index" :menu="menu" />
    </div>
</template>