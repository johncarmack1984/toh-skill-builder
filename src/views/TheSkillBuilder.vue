<script setup lang="ts">
import SkillCharacterData from "../components/SkillCharacterData.vue";
import SkillPyramid from "../components/SkillPyramid.vue";
import { tohSkillBuilderStore } from "../stores/tohSkillBuilder";
import { migrationRun } from "@/stores/util/migration-run";

const store = tohSkillBuilderStore();
const averageClass = "border-red";
const fairClass = "border-yellow";
const goodClass = "border-green";
const greatClass = "border-purple";

migrationRun(store);
</script>

<template>
  <div
    class="z-40 sticky top-[-2px] bg-slate-100 border-b-[3px] border-dotted border-slate-500"
  >
    <SkillCharacterData />
    <SkillPyramid />
  </div>
  <div class="z-0 md:flex pt-2">
    <ul class="z-0 flex flex-wrap justify-around">
      <li
        v-for="(skill, index) in store.character.skills"
        :key="index"
        :skill="skill"
        class="z-0 w-1/3 rounded-sm bg-slate-200 m-1 p-[7px] max-w-[120px] h-[125px] border-[3px] overflow-hidden"
        :class="[
          skill.value == 1 ? averageClass : '',
          skill.value == 2 ? fairClass : '',
          skill.value == 3 ? goodClass : '',
          skill.value == 4 ? greatClass : '',
        ]"
      >
        <div>
          <input
            type="text"
            disabled
            :min="0"
            :max="4"
            v-model="skill.value"
            class="z-20 opacity-100 text-[17px] py-[.6rem] my-[-5px] font-black text-blue-dark disabled:text-blue-dark w-12 bg-white text-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-dark"
          />
        </div>
        <button
          @click="skill.value--"
          :disabled="skill.value < 1"
          class="z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white focus:ring-2 ring-blue-light disabled:bg-slate-300"
        >
          -
        </button>
        <button
          @click="skill.value++"
          :disabled="skill.value > 3 || store.remainingPoints <= 0"
          class="z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white focus:ring-2 ring-blue-light disabled:bg-slate-300"
        >
          +
        </button>
        <textarea
          v-model="skill.name"
          class="z-10 text-[16px] w-full text-center break-words resize-none mt-[-2px] font-bold text-blue-dark bg-slate-50 rounded leading-5 pt-[1px]"
        ></textarea>
      </li>
    </ul>
  </div>
</template>
