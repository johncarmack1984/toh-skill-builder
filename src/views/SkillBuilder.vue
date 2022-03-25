<script setup lang="ts">
import SkillCharacterData from '../components/SkillCharacterData.vue';
import SkillBox from '../components/SkillBox.vue';
import SkillPyramid from '../components/SkillPyramid.vue';
import { useCharacterStore } from '../stores/character';
import Footer from '../components/Footer.vue'
const character = useCharacterStore()
character.characterName = "Billibar of Southduke"
character.totalPoints = 20
let remainingPoints = 3
</script>

<template>
    <div class="z-40 sticky top-[-2px] bg-slate-100 border-b-[3px] border-dotted border-slate-500">
        <SkillCharacterData
            :characterName="character.characterName"
            :totalPoints="character.totalPoints"
            :remainingPoints="remainingPoints"
        />
        <SkillPyramid :skills="character.skills" />     
    </div>
    <div class="z-0 md:flex pt-2">   
        <ul class="z-0 flex flex-wrap justify-around">   
            <SkillBox 
                v-for="skill in character.skills"          
                :key="skill.id"        
                :skill="skill"
                :remaininPoints="remainingPoints"
            />
        </ul>
    </div>
</template>