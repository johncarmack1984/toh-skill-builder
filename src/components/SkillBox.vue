<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['skill','remainingPoints'],
    setup(props) {
      return { props }
    },
    data() {
        return {
            averageClass: 'border-red',
            fairClass: 'border-yellow',
            goodClass: 'border-green',
            greatClass: 'border-purple',            
        }
    },
    mounted() {
    }
})
</script>


<template>
    <li
        class="
            z-0 w-1/3 rounded-sm bg-slate-200 m-1 p-[7px] max-w-[120px] h-[125px] border-[3px] overflow-hidden
        "
        :class="[
            skill.skillLevel == 1 ? averageClass: '',
            skill.skillLevel == 2 ? fairClass: '',
            skill.skillLevel == 3 ? goodClass: '',
            skill.skillLevel == 4 ? greatClass: '',
        ]"    
    >
         <div>
            <input 
              type="text" disabled :min="0" :max="4" v-model="skill.skillLevel" 
              class="
                z-20 opacity-100 text-[17px] py-[.6rem] my-[-5px] font-black 
                text-blue-dark disabled:text-blue-dark w-12
                bg-white text-center rounded-full
                focus:outline-none focus:ring-2 focus:ring-blue-dark
              " 
            /> 
          </div>
          <button 
            @click="skill.skillLevel--;" :disabled="skill.skillLevel < 1" 
            class="
              z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light
              rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white 
              focus:ring-2 ring-blue-light disabled:bg-slate-300
            "
          >
              -
          </button>
          <button 
            @click="skill.skillLevel++;" :disabled="((skill.skillLevel > 3) || remainingPoints <= 0)" 
            class="
              z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light
              rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white 
              focus:ring-2 ring-blue-light disabled:bg-slate-300
            "
          >
               +
          </button>
          <textarea
            v-model="skill.skillName"
            class="
              z-10 text-[16px] w-full text-center break-words resize-none mt-[-2px]
              font-bold text-blue-dark bg-slate-50 rounded leading-5 pt-[1px]" 
          ></textarea>
    </li>
</template>

