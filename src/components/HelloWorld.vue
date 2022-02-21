<script>
export default {
  name: "App",
  data() {
    return { 
      total: 20,
      skills: [
        {"name": "Physique / Resist", "value": 0 },
        {"name": "Willpower", "value": 0 },
        {"name": "Fight", "value": 0 },
        {"name": "Shoot", "value": 0 },
        {"name": "Strength", "value": 0 },
        {"name": "Acrobatics / Dodge", "value": 0 },
        {"name": "Flying", "value": 0 },
        {"name": "Bile / Demonics", "value": 0 },
        {"name": "Craft", "value": 0 },
        {"name": "Stealth", "value": 0 },
        {"name": "Notice / Perception", "value": 0 },
        {"name": "Persuasion", "value": 0 },
        {"name": "Deception", "value": 0 },
        {"name": "Intimidation", "value": 0 },
        {"name": "Performance", "value": 0 },
        {"name": "Empathy", "value": 0 },
        {"name": "Intelligence", "value": 0 },
        {"name": "Lore", "value": 0 },
        {"name": "Resources", "value": 0 },
        {"name": "Contacts", "value": 0 },
        {"name": "Nature", "value": 0 },
        {"name": "Medicine", "value": 0 },
      ]
    };
  },
  methods: {
    purpSquares() { return this.skills.filter(function (skill) {return skill.value == 4}).length },
    greenSquares() { return this.skills.filter(function (skill) {return skill.value == 3}).length },
    yellowSquares() { return this.skills.filter(function (skill) {return skill.value == 2}).length },
    redSquares() { return this.skills.filter(function (skill) {return skill.value == 1}).length },
  },
  mounted() {
    console.log() 
  },
  computed: {
    remainingPoints() { 
      return this.total - ( (this.redSquares()*1) + (this.yellowSquares()*2) +(this.greenSquares()*3) + (this.purpSquares()*4) ) 
    }
  }
};
</script>

<template>
  <div class="max-w-md my-0 py-0 mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
    <div class="flex flex-row flex-wrap justify-between item pt-0 mt-[-3rem]">
      <div class="text-xl md:text-xl self-stretch bg-slate-100 grow">      
        <ul class="flex flex-row flex-nowrap leading-none">&nbsp;<li v-for="n in purpSquares()">🟪</li></ul>
        <ul class="flex flex-row flex-nowrap leading-none">&nbsp;<li v-for="n in greenSquares()">🟩</li></ul>
        <ul class="flex flex-row flex-nowrap leading-none">&nbsp;<li v-for="n in yellowSquares()">🟨</li></ul>
        <ul class="flex flex-row flex-nowrap leading-none">&nbsp;<li v-for="n in redSquares()">🟥</li></ul>     
      </div>  
      <div class="text-md md:text-xl bg-slate-200 pr-12">
        <ul class="flex flex-row flex-nowrap leading-none font-bold">&nbsp;{{ purpSquares() }}&nbsp;🟪&nbsp;<span class="text-sm">Great</span></ul>
        <ul class="flex flex-row flex-nowrap leading-none font-bold">&nbsp;{{ greenSquares() }}&nbsp;🟩&nbsp;<span class="text-sm">Good</span></ul>
        <ul class="flex flex-row flex-nowrap leading-none font-bold">&nbsp;{{ yellowSquares() }}&nbsp;🟨&nbsp;<span class="text-sm">Fair</span></ul>
        <ul class="flex flex-row flex-nowrap leading-none font-bold">&nbsp;{{ redSquares() }}&nbsp;🟥&nbsp;<span class="text-sm">Average</span></ul>
      </div>
      <div class="bg-slate-100 basis-1/4 justify-self-end">
        <div class="text-[16px] md:text-4xl">
          {{ remainingPoints }} /&nbsp;
          <input 
            type="number" v-model="total" :min="0"
            class="w-8 md:w-16" 
          />
        </div>
        <p class="text-xs md:text-sm">Remaining / Total</p>
      </div>
    </div>
    <div class="md:flex">  
      <ul class="flex flex-wrap justify-around">
        <li 
          v-for="skill in skills" :key="skill.name" :value="skill.value"
          class="
            w-1/3 rounded-sm bg-slate-200 m-1 p-2 max-w-[120px] h-[125px] border-4 border-dotted overflow-hidden 
            border-transparent"
        >
          <div>
            <input 
              type="text" readonly :min="0" :max="4" v-model="skill.value" 
              class="text-[16px] font-bold w-8 bg-slate-50 rounded text-center rounded-full" 
            /> 
          </div>
          <button 
            @click="skill.value--;" :disabled="skill.value < 1" 
            class="
              text-[16px] font-bold bg-blue-dark hover:bg-blue-400 transition-colors 
              rounded-full px-[16px] py-[8px] m-[2px] text-white focus:ring-2 ring-blue-500
            "
          >
              -
          </button>
          <button 
            @click="skill.value++;" :disabled="((skill.value > 3) || remainingPoints == 0)" 
            class="
              text-[16px] font-bold bg-blue-dark hover:bg-blue-400 transition-colors 
              rounded-full px-[16px] py-[8px] m-[2px] text-white focus:ring-2 ring-blue-500
            "
          >
               +
          </button>
          <p class="text-sm font-bold text-blue-dark bg-slate-50 mt-1 rounded leading-4">
            {{ skill.name }}
          </p>
        </li>
      </ul>  
    </div>
  </div>
</template>

