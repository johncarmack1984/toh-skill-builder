<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['skill'],
    setup() {
        
    },
})
</script>


<template>
    <div>
                {{  skill.skillName + ': ' + skill.skillLevel }}
    </div>
</template>

