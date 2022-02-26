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
      ],
      averageClass: 'border-red',
      fairClass: 'border-yellow',
      goodClass: 'border-green',
      greatClass: 'border-purple'
    };
  },
  methods: {
    purpSquares() { return this.skills.filter(function (skill) {return skill.value == 4}).length },
    greenSquares() { return this.skills.filter(function (skill) {return skill.value == 3}).length },
    yellowSquares() { return this.skills.filter(function (skill) {return skill.value == 2}).length },
    redSquares() { return this.skills.filter(function (skill) {return skill.value == 1}).length },
    resetNames () { this.$data.skills.forEach( (skill,index) => skill.name = this.$options.data().skills[index].name) },
    resetScores () { this.$data.skills.forEach( (skill,index) => skill.value = 0) },
    resetAll () { 
      this.resetScores()
      this.resetNames()
      this.total = 20
    },    
  },
  mounted() {
    this.skills = JSON.parse(localStorage.getItem("skills")) || this.skills
    this.total = JSON.parse(localStorage.getItem("total")) || this.total
    
  },
  watch: {
    "skills": {
      deep: true,
      handler: function (after) {
        localStorage.setItem("skills", JSON.stringify(after));
      },
    },
    "total": { 
      handler: function (after) {
        localStorage.setItem("total", JSON.stringify(after)); 
      },
    },
  },
  computed: {
    remainingPoints() { 
      return this.total - ( (this.redSquares()*1) + (this.yellowSquares()*2) +(this.greenSquares()*3) + (this.purpSquares()*4) ) 
    }
  }
};
</script>

<template>
  <div class="max-w-md md:my-0 md:py-0 mx-auto bg-white rounded-xl shadow-md md:max-w-2xl mt-[-55px]">
    <!-- Top Bar -->     
    <div class="z-40 sticky top-0 flex md:flex-row flex-wrap justify-between">

      <!-- Squares -->

      <div class="z-50 text-xl md:text-xl bg-slate-100 grow items-baseline">      
        <ul class="flex flex-row flex-nowrap leading-none items-baseline">&nbsp;<li v-for="n in purpSquares()">🟪</li></ul>
        <ul class="flex flex-row flex-nowrap leading-none items-baseline">&nbsp;<li v-for="n in greenSquares()">🟩</li></ul>
        <ul class="flex flex-row flex-nowrap leading-none items-baseline">&nbsp;<li v-for="n in yellowSquares()">🟨</li></ul>
        <ul class="flex flex-row flex-nowrap leading-none items-baseline">&nbsp;<li v-for="n in redSquares()">🟥</li></ul>     
      </div>  

      <!-- Legend -->

      <div class="z-50 text-md md:text-xl bg-slate-200 md:pr-12 items-baseline overflow-clip">
        <ul class="flex flex-row flex-nowrap leading-none font-bold self-baseline items-baseline">&nbsp;{{ purpSquares() }}&nbsp;🟪&nbsp;<span class="text-sm">Great</span></ul>
        <ul class="flex flex-row flex-nowrap leading-none font-bold self-baseline items-baseline">&nbsp;{{ greenSquares() }}&nbsp;🟩&nbsp;<span class="text-sm">Good</span></ul>
        <ul class="flex flex-row flex-nowrap leading-none font-bold self-baseline items-baseline">&nbsp;{{ yellowSquares() }}&nbsp;🟨&nbsp;<span class="text-sm">Fair</span></ul>
        <ul class="flex flex-row flex-nowrap leading-none font-bold self-baseline items-baseline">&nbsp;{{ redSquares() }}&nbsp;🟥&nbsp;<span class="text-sm">Average</span></ul>
      </div>
      
      <!-- Total / Remaining -->

      <div class="z-50 bg-slate-100 md:basis-1/4 justify-self-end">
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

    <!-- Skills --> 

    <div class="z-0 md:flex pt-2"> 
      <ul class="z-0 flex flex-wrap justify-around">
        <li 
          v-for="(skill, index) in skills" 
          :key="skill" 
          :value="skill.value"
          class="
            z-0 w-1/3 rounded-sm bg-slate-200 m-1 p-[7px] max-w-[120px] h-[125px] border-[3px] border- overflow-hidden
          "
          :class="[
            skill.value == 1 ? averageClass: '',
            skill.value == 2 ? fairClass: '',
            skill.value == 3 ? goodClass: '',
            skill.value == 4 ? greatClass: '',
          ]"
        >
          <div>
            <input 
              type="text" disabled :min="0" :max="4" v-model="skill.value" 
              class="
                z-10 opacity-100 text-[16px] py-[.7rem] my-[-5px] font-extrabold text-blue-dark w-12
                bg-white rounded-full text-center rounded-full
                focus:outline-none focus:ring-2 focus:ring-blue-dark
              " 
            /> 
          </div>
          <button 
            @click="skill.value--;" :disabled="skill.value < 1" 
            class="
              z-20 text-[16px] font-black bg-blue-dark hover:bg-blue-light transition-colors 
              rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white 
              focus:ring-2 ring-blue-light disabled:bg-slate-600
            "
          >
              -
          </button>
          <button 
            @click="skill.value++;" :disabled="((skill.value > 3) || remainingPoints == 0)" 
            class="
              z-20 text-[16px] font-black bg-blue-dark hover:bg-blue-light transition-colors 
              rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white 
              focus:ring-2 ring-blue-light disabled:bg-slate-600
            "
          >
               +
          </button>
          <textarea
            v-model="skill.name"
            class="
              z-10 text-[16px] w-full text-center break-words resize-none mt-[-2px]
              font-bold text-blue-dark bg-slate-50 rounded leading-5 pt-[1px]" 
          ></textarea>
        </li>
      </ul>  
    </div>

    <!-- Reset Buttons --> 

    <div class="z-0 text-left pl-[2.5rem] mt-16 pt-2">
      reset 
      <button 
        @click="resetScores"
        class="
          text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
          rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
        "  
      >scores</button>
      <button 
        @click="resetNames"
        class="
          text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
          rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
        "  
      >names</button>            
      <button 
        @click="resetAll"
        class="
          text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
          rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
        "  
      >all</button>
    </div>

  </div>
</template>

