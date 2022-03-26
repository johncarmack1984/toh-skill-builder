<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['label'],
    emits: ['buttonEvent'],
    setup() {
        
    },
})
</script>


<template>
    <button 
        @click="$emit('buttonEvent')"
        class="
            text-[16px] font-bold bg-slate-50 hover:bg-slate-200
            rounded-full px-[16px] py-[4px] m-[2px] text-slate-800 focus:ring-2 ring-slate-500
        "
    >


            {{ label }}...


</button>  
</template>