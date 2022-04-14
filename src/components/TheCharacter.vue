<script setup lang="ts">
import { tohSkillBuilderStore } from "../stores/tohSkillBuilder";
const store = tohSkillBuilderStore();
</script>

<template>
  <div class="">
    <div class="flex flex-row flex-nowrap justify-between">
      <div class="grow">
        <input
          type="text"
          placeholder="Character name..."
          data-test="name"
          v-model="store.character.name"
          class="text-left w-full text-2xl md:text-3xl px-1 sm:px-2 py-1 border-[1px] border-slate-400 rounded-sm"
        />
      </div>
      <div class="z-50 relative pl-2 mr-3 sm:mr-0">
        <div
          class="text-2xl md:text-3xl whitespace-nowrap"
          data-test="remainingPoints"
        >
          {{ store.remainingPoints }} /&nbsp;

          <input
            type="number"
            v-model="store.character.totalPoints"
            :min="store.character.totalPoints - store.remainingPoints"
            pattern="[0-9]*"
            inputmode="numeric"
            class="w-12 md:w-16 pl-1 py-1 border-[1px] border-slate-400 rounded"
          />
        </div>
        <div
          class="text-xs md:text-sm absolute top-11 md:top-12 right-[0.75rem] md:right-[1.15rem]"
        >
          Remaining / Total
        </div>
      </div>
    </div>
  </div>
</template>
