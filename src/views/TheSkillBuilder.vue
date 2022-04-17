<script setup lang="ts">
import { ref, computed } from "vue";
import TheCharacter from "../components/TheCharacter.vue";
import TheSkillPyramid from "../components/TheSkillPyramid.vue";
import { tohSkillBuilderStore } from "../stores/tohSkillBuilder";
import { migrationRun } from "@/stores/util/migration-run";
import _ from "lodash";

const store = tohSkillBuilderStore();

import draggable from "vuedraggable";

const drag = ref(false);
const averageClass = "border-red";
const fairClass = "border-yellow";
const goodClass = "border-green";
const greatClass = "border-purple";
//['red','orange','yellow','green','cyan','blue','purple']

/*
for (let i in _.range(0,256)) {
  console.log(i);
}
*/
const skills = computed({
  get() {
    return store.character.skills;
  },
  set(value) {
    store.$patch((state) => {
      state.character.skills = value;
    });
  },
});

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});

migrationRun(store);
</script>

<template>
  <div
    class="z-40 sticky top-[-2px] bg-slate-100 border-b-[3px] border-dotted border-slate-500"
  >
    <TheCharacter />
    <TheSkillPyramid />
  </div>
  <div class="z-0 md:flex pt-2">
    <ul>
      <draggable
        v-model="skills"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        class="z-0 flex flex-wrap justify-around list-group"
      >
        <template #item="{ element }">
          <li
            class="z-0 rounded-sm bg-slate-200 m-1 p-[7px] w-[120px] h-[125px] border-[3px] overflow-hidden list-group-item"
            :class="[
              element.value == 1 ? averageClass : '',
              element.value == 2 ? fairClass : '',
              element.value == 3 ? goodClass : '',
              element.value == 4 ? greatClass : '',
              element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin',
            ]"
            @click="element.fixed = !element.fixed"
            aria-hidden="true"
          >
            <div>
              <input
                type="text"
                disabled
                :min="0"
                :max="4"
                :value="element.value"
                class="z-20 opacity-100 text-[17px] py-[.6rem] my-[-5px] font-black text-blue-dark disabled:text-blue-dark w-12 bg-white text-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-dark"
              />
            </div>
            <button
              class="z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white focus:ring-2 ring-blue-light disabled:bg-slate-300"
              @click="element.value--"
              :disabled="element.value < 1"
            >
              -
            </button>
            <button
              class="z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white focus:ring-2 ring-blue-light disabled:bg-slate-300"
              @click="element.value++"
              :disabled="element.value > 3 || store.remainingPoints <= 0"
            >
              +
            </button>
            <textarea
              class="z-10 text-[16px] w-full text-center break-words resize-none mt-[-2px] font-bold text-blue-dark bg-slate-50 rounded leading-5 pt-[1px]"
              >{{ element.name }}</textarea
            >
          </li>
        </template>
      </draggable>
    </ul>
  </div>
</template>

<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
