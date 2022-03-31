<script setup lang="ts">
import { myTohSkillBuilderStore } from "../stores/myTohSkillBuilder";

const myTohSkillBuilder = myTohSkillBuilderStore();
const skills = myTohSkillBuilder.character.skills;

interface Skill {
  id: string;
  skillName: string;
  skillLevel: number;
}

function purpSquares() {
  return skills.filter(function (skill: Skill) {
    return skill.skillLevel == 4;
  }).length;
}
function greenSquares() {
  return skills.filter(function (skill: Skill) {
    return skill.skillLevel == 3;
  }).length;
}
function yellowSquares() {
  return skills.filter(function (skill: Skill) {
    return skill.skillLevel == 2;
  }).length;
}
function redSquares() {
  return skills.filter(function (skill: Skill) {
    return skill.skillLevel == 1;
  }).length;
}
</script>
<template>
  <div class="flex md:flex-row flex-wrap justify-between">
    <!-- Legend -->

    <div
      class="z-50 pt-1 text-xl md:text-xl pr-2 pl-2 sm:pl-6 md:pl-8 text-right items-baseline overflow-clip"
    >
      <ul
        class="flex flex-row flex-nowrap justify-end leading-none font-bold items-center"
      >
        <span class="text-sm leading-none">Great (+4)</span
        >&nbsp;🟪&nbsp;<span class="w-4">{{ purpSquares() }}</span>
      </ul>
      <ul
        class="flex flex-row flex-nowrap justify-end leading-none font-bold items-center"
      >
        <span class="text-sm leading-none">Good (+3)</span
        >&nbsp;🟩&nbsp;<span class="w-4">{{ greenSquares() }}</span>
      </ul>
      <ul
        class="flex flex-row flex-nowrap justify-end leading-none font-bold items-center"
      >
        <span class="text-sm leading-none">Fair (+2)</span
        >&nbsp;🟨&nbsp;<span class="w-4">{{ yellowSquares() }}</span>
      </ul>
      <ul
        class="flex flex-row flex-nowrap justify-end leading-none font-bold items-center"
      >
        <span class="text-sm leading-none">Average (+1)</span
        >&nbsp;🟥&nbsp;<span class="w-4">{{ redSquares() }}</span>
      </ul>
    </div>

    <!-- Squares -->

    <div
      class="z-50 pt-1 text-xl md:text-xl grow items-baseline"
      data-testid="skill-pyramid"
    >
      <ul
        class="flex flex-row flex-nowrap leading-none items-baseline"
        data-testid="purp-squares"
      >
        &nbsp;
        <li v-for="n in purpSquares()" :key="n">🟪</li>
      </ul>
      <ul
        class="flex flex-row flex-nowrap leading-none items-baseline"
        data-testid="green-squares"
      >
        &nbsp;
        <li v-for="n in greenSquares()" :key="n">🟩</li>
      </ul>
      <ul
        class="flex flex-row flex-nowrap leading-none items-baseline"
        data-testid="yellow-squares"
      >
        &nbsp;
        <li v-for="n in yellowSquares()" :key="n">🟨</li>
      </ul>
      <ul
        class="flex flex-row flex-nowrap leading-none items-baseline"
        data-testid="red-squares"
      >
        &nbsp;
        <li v-for="n in redSquares()" :key="n">🟥</li>
      </ul>
    </div>
  </div>
</template>
