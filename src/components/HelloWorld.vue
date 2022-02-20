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
    remainingPoints() { return this.total - ( (this.redSquares()*1) + (this.yellowSquares()*2) +(this.greenSquares()*3) + (this.purpSquares()*4) ) }
  }
};
</script>

<template>
  <div class="mx-auto w-screen">
    <div class="flex flex-row flex-wrap justify-around">
      <div class="text-2xl basis-1/3 content-start">      
        <ul class="flex flex-row flex-nowrap leading-none">&nbsp;<li v-for="n in purpSquares()">🟪</li></ul>
        <ul class="flex flex-row flex-nowrap leading-none">&nbsp;<li v-for="n in greenSquares()">🟩</li></ul>
        <ul class="flex flex-row flex-nowrap leading-none">&nbsp;<li v-for="n in yellowSquares()">🟨</li></ul>
        <ul class="flex flex-row flex-nowrap leading-none">&nbsp;<li v-for="n in redSquares()">🟥</li></ul>     
      </div>  
      <div class="text-2xl basis-1/3">
        <ul class="flex flex-row flex-nowrap leading-none">🟪&nbsp;Great</ul>
        <ul class="flex flex-row flex-nowrap leading-none">🟩&nbsp;Good</ul>
        <ul class="flex flex-row flex-nowrap leading-none">🟨&nbsp;Fair</ul>
        <ul class="flex flex-row flex-nowrap leading-none">🟥&nbsp;Average</ul>
      </div>
      <div class="basis-1/3 content-start items-start text-left">
        <div class="mx-auto flex flex-row flex-nowrap text-4xl">
          {{ remainingPoints }} /&nbsp;
          <input 
            type="number"
            v-model="total" 
            class="w-16" 
            :min="0"
          />
        </div>
        <p class="text-md">Remaining / Total</p>
      </div>
   </div>
    <div class="">  
      <ul class="flex flex-wrap">
        <li 
          v-for="skill in skills" 
          :key="skill.name"
          :value="skill.value"
          class="rounded-lg bg-slate-200 m-4 p-3 max-w-[100px] h-[115px]"
        >
          <div><input type="text" readonly :min="0" :max="4" class="text-xl font-bold w-8 bg-slate-50 rounded text-center rounded-full" v-model="skill.value" /> </div>
          <button 
            :disabled="skill.value < 1"
            @click="skill.value--;" 
            class="
              text-xs font-bold bg-blue-dark hover:bg-blue-400 transition-colors 
              rounded-full px-[12px] py-[7px] m-[1px] text-white focus:ring-2 ring-blue-500
            "
          >
              -
          </button>
          <button 
            :disabled="((skill.value > 3) || remainingPoints == 0)"
            @click="skill.value++;" 
            class="
              text-xs font-bold bg-blue-dark hover:bg-blue-400 transition-colors 
              rounded-full px-[12px] py-[7px] m-[1px] text-white focus:ring-2 ring-blue-500
            "
          >
               +
          </button>
          <p class="text-sm font-bold text-blue-dark">
            {{ skill.name }}
          </p>
        </li>
      </ul>  
    </div>
  </div>
</template>