<script setup lang="ts">
import { getActivePinia } from 'pinia';
import SkillCharacterData from '../components/SkillCharacterData.vue';
import SkillBox from '../components/SkillBox.vue';
import SkillPyramid from '../components/SkillPyramid.vue';
import { useCharacterStore } from '../stores/character';
import Footer from '../components/Footer.vue'
const character = useCharacterStore()
const pinia = getActivePinia()
character.$subscribe((mutation, state) => {
    //console.log (character)
    //console.log(pinia.state.value.character)
 })




</script>

<template>
    <div class="z-40 sticky top-[-2px] bg-slate-100 border-b-[3px] border-dotted border-slate-500">
        <SkillCharacterData
            :character="character"
        />
        <SkillPyramid :skills="character.skills" />     
    </div>
    <div class="z-0 md:flex pt-2">   
        <ul class="z-0 flex flex-wrap justify-around">   
            <SkillBox 
                v-for="(skill, index) in character.skills"          
                :key="index"        
                :skill="skill"
                :remainingPoints="character.remainingPoints"
            />
        </ul>
    </div>
</template> 