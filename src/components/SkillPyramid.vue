<script setup lang="ts">
import type { skill } from "env";
import { computed } from "vue";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";

const store = myTohSkillBuilderStore();

const legend = [
  { level: 4, label: "Great", symbol: "🟪" },
  { level: 3, label: "Good", symbol: "🟩" },
  { level: 2, label: "Fair", symbol: "🟨" },
  { level: 1, label: "Average", symbol: "🟥" },
];

const squares = computed(() => {
  return legend.map((level) => {
    return store.character.skills.filter((skill: skill) => {
      return skill.skillLevel == level.level;
    }).length;
  });
});
</script>
<template>
  <div class="flex md:flex-row flex-wrap justify-between">
    <!-- Legend -->

    <div
      class="z-50 pt-1 text-xl md:text-xl pr-2 pl-2 sm:pl-6 md:pl-8 text-right items-baseline overflow-clip"
    >
      <div
        v-for="(level, index) in legend"
        :key="index"
        :data-testid="`legend-row-${index}`"
        class="flex flex-row flex-nowrap justify-end leading-none font-bold items-center"
      >
        <span class="text-sm leading-none">{{
          `${level.label} (+${level.level})`
        }}</span
        >&nbsp;{{ level.symbol }}&nbsp;<span class="w-4">{{
          squares[index]
        }}</span>
      </div>
    </div>

    <!-- Squares -->

    <div
      class="z-50 pt-1 text-xl md:text-xl grow items-baseline"
      data-testid="skill-pyramid"
    >
      <ul
        v-for="(level, index) in legend"
        :key="index"
        class="flex flex-row flex-nowrap leading-none items-baseline"
        :data-testid="`pyramid-row-${index}`"
      >
        &nbsp;
        <li v-for="n in squares[index]" :key="n">{{ level.symbol }}</li>
      </ul>
    </div>
  </div>
</template>
