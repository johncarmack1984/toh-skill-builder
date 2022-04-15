<script setup lang="ts">
import type { skill } from "env";
import { computed } from "vue";
import { tohSkillBuilderStore } from "@/stores/tohSkillBuilder";

const store = tohSkillBuilderStore();

/*



*/

const legend = [
  { level: 8, label: "Legendary", symbol: "🟪" },
  { level: 7, label: "Epic", symbol: "🟦" },
  { level: 6, label: "Fantastic", symbol: "🟩" },
  { level: 5, label: "Superb", symbol: "🟨" },
  { level: 4, label: "Great", symbol: "🟪" },
  { level: 3, label: "Good", symbol: "🟥" },
  { level: 2, label: "Fair", symbol: "🟫" },
  { level: 1, label: "Average", symbol: "🟫" },
  { level: 0, label: "Mediocre", symbol: "" },
  { level: -1, label: "Poor", symbol: "🟥" },
  { level: -2, label: "Terrible", symbol: "🟥" },
  { level: -3, label: "Catastrophic", symbol: "🟥" },
  { level: -4, label: "Horrifying", symbol: "🟥" },
];

console.log(legend.filter((level) => level.level > 0).length);

const hues = legend.map((level, index) => {
  if (level.level > 0) {
    let plus = legend.filter((level) => level.level > 0);
    let angle = (360 / plus.length) * index;
    if (angle > 360) {
      angle = angle - 360;
    }
    return `hsl(${angle},90%,45%,0.75)`;
  }
  if (level.level === 0) {
    console.log(index);
    return `hsl(210,39%,96%,0.78)`;
  }
  if (level.level < 0) {
    let subZero = legend.filter((level) => level.level < 0);
    let lum = ((100 / subZero.length) * (index - 8) - 100) * -1;
    return `hsl(0,0%,${lum}%,0.8)`;
  }
});

/*const hues2 = legend.filter((level) => level.level > 0);*/

let splice = hues.splice(8, 5);

//console.log(splice);

hues.reverse();

hues.push(...splice);

console.log(hues);

defineExpose({ legend });

//const

const squares = computed(() => {
  return legend.map((level) => {
    return store.character.skills.filter((skill: skill) => {
      return skill.value == level.level;
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
          `${level.label} (${level.level > 0 ? "+" : ""}${level.level})`
        }}</span
        >&nbsp;
        <!--{{ level.symbol }}-->
        <svg>
          <rect :style="`fill: ${hues[index]};`" />
        </svg>
        &nbsp;<span class="w-4">{{ squares[index] }}</span>
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

<style scoped>
svg {
  background-image: linear-gradient(
    20deg,
    hsl(0, 0%, 0%, 0.75) 0%,
    hsl(0, 100%, 100%, 1) 100%
  );
  width: 1.25rem;
  height: 1.25rem;
}

rect {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
