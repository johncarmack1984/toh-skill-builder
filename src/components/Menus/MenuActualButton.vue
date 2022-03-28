<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['item'],
    emits: ['hideMenu'],
})
</script>

<template>
    <button 
        v-if="item.action != undefined"
        @click="item.action(); $emit('hideMenu')"
        class="
            text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
            rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
            whitespace-nowrap
        " 
    >
            
        {{ item.label }}

    </button>
    <div v-else class="relative flex py-3 items-center">
        <span class="text-xs flex-shrink mx-4 text-gray-600">
            
            {{ item.label }}...
        
        </span>
    </div>
</template>