<script setup lang="ts">
import SkillCharacterData from '../components/SkillCharacterData.vue';
import SkillBox from '../components/SkillBox.vue';
import SkillPyramid from '../components/SkillPyramid.vue';
import { useCharacterStore } from '../stores/character';
import Footer from '../components/Footer.vue'
const character = useCharacterStore()
character.characterName = "Billibar of Southduke"
character.totalPoints = 20
</script>

<template>
    <SkillCharacterData
        :characterName="character.characterName"
        :totalPoints="character.totalPoints"
    />
    <SkillPyramid />          
    <SkillBox 
        v-for="skill in character.skills"          
        :key="skill.id"        
        :skill="skill"
    />
</template>