<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: [
        'characterName',
        'totalPoints',
    ],
    setup(props) {
        return { props }
    },
});


</script>

<template>
    <div v-if="characterName">

            {{ characterName }}
            {{ totalPoints }}
    </div>
</template>