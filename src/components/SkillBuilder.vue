<script>
/**import SkillBox from './SkillBox.vue'*/

const clickOutside = {
    mounted: (el, binding, vnode) => {
        el.clickOutsideEvent = function(event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
};
export default {
  name: "App",
  directives: {
    clickOutside
  },
  data() {
    return { 
      character: {
        "id": "",
        "name": "",
        "totalPoints": 20,
        "skills": [
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
      },
      savedCharacters: [
        
      ],
      menus: [],
      averageClass: 'border-red',
      fairClass: 'border-yellow',
      goodClass: 'border-green',
      greatClass: 'border-purple',
      showResetMenu: false,
      showFileMenu: false
    };
  },
  methods: {
    hideFileMenu() { this.showFileMenu = false },
    hideResetMenu() { this.showResetMenu = false },
    purpSquares() { return this.character.skills.filter(function (skill) {return skill.value == 4}).length },
    greenSquares() { return this.character.skills.filter(function (skill) {return skill.value == 3}).length },
    yellowSquares() { return this.character.skills.filter(function (skill) {return skill.value == 2}).length },
    redSquares() { return this.character.skills.filter(function (skill) {return skill.value == 1}).length },
    isDefaultCharacter () { return JSON.stringify(this.$data.character) === JSON.stringify(this.$options.data().character) },
    isVariableUnset (variable) { return ( variable === "" || typeof variable === 'undefined' || variable === null ) },
    createCharacter(character) { this.savedCharacters.push(character); console.log("character " + this.character.name + " added to savedCharacters") },
    updateCharacter(characterIndex) { this.savedCharacters[characterIndex] = this.character },
    saveCharacter () { 
        // if character is unnamed, give name "Unnamed (x)"
        if (this.isVariableUnset(this.character.name)) { 
          var unnamedArray = this.savedCharacters.filter(function (character) { return character.name.includes("Unnamed ")})
          
          /**getMax number {
          console.log("attempted to find max unnamed file...")
          const getMax = (a, b) => Math.max(a,b)
          const stripName 
          unnamedArray.map( (character) => character.name = character.name.replace(/\D/g,''))
          console.log(JSON.stringify(unnamedArray.filter( (character) { return character.name.replace(/\D/g,'') } ))
          var unnamedFileIndex = unnamedArray2.reduce(getMax) 
          console.log(JSON.stringify(unnamedFileIndex)
          console.log("the function completed,?")
          }*/

          var unnamedIndex = unnamedArray.length
          this.character.name = "Unnamed " + unnamedIndex
        }

        console.log(this.character.name + " saving")
        
        // set totalPoints if unset
        //if (this.isVariableUnset(this.character.totalPoints)) { this.character.totalPoints = this.totalUsedPoints }
        // if character doesn't have an identifier, generate one and add it to definition
        if (this.isVariableUnset(this.character.id)) {
          this.character.id = Math.random().toString(36).slice(2);
          console.log("id generated " + this.character.id)
          this.createCharacter(this.character);
        } 
        else {
          console.log("id is " + this.character.id + " and tested valid")
          var savedIndex = this.savedCharacters.findIndex(obj => { return obj.id === this.character.id } ) 
          if (savedIndex === -1) { 
            console.log("...but character did not exist in savedCharacters. \n create ")
            this.createCharacter(this.character) 
          }
          else { 
            console.log("update")
            this.updateCharacter(savedIndex)
          }
        }
        console.log("saved")
      },
    newCharacter () {
      console.log("is default? " + JSON.stringify(this.isDefaultCharacter()))
      // if the character in state has changed from default, save character
      if (!this.isDefaultCharacter()) { this.saveCharacter() }
      this.character = this.$options.data().character
      console.log("new character")
    },
    openCharacter (id) { 
      // if the current character is diff from default, save open character
      if (!this.isDefaultCharacter()) { this.saveCharacter() }
      // open character from saved array by character id
      this.character = this.savedCharacters.find(obj => { return obj.id === id } )
      console.log("character opened")
    },
    deleteCharacter (id) {
      var deleteIndex = this.savedCharacters.findIndex(obj => { return obj.id === id } )
      console.log("deleting character " + id + " at index " + deleteIndex)
      if (this.character.id === this.savedCharacters[deleteIndex].id) { this.resetAll() }
      this.savedCharacters.splice(deleteIndex, 1) 
    },
    resetCharacterName () { this.$data.character.name = "" },
    resetSkillNames () { this.$data.character.skills.forEach( (skill,index) => skill.name = this.$options.data().character.skills[index].name) },
    resetScores () { this.$data.character.skills.forEach( (skill,index) => skill.value = 0) },
    resetTotal() { this.character.totalPoints = this.$options.data().character.totalPoints },
    resetAll () { 
      this.resetScores()
      this.resetCharacterName()
      this.resetSkillNames()
      this.resetTotal()
    },    
  },
  mounted() {
    /** remove old skills & replace with new character.skills */
    //if (this.character.skills = JSON.parse(localStorage.getItem("skills"))) { localStorage.removeItem("skills") } 
    /** if exists, sync browser with localStorage */
    //if (this.character.totalPoints = JSON.parse(localStorage.getItem("total"))) { localStorage.removeItem("total") }
    //if this.isVariableUnset(this.character.totalPoints))
    this.character = JSON.parse(localStorage.getItem("character")) || this.character
    this.savedCharacters = JSON.parse(localStorage.getItem("savedCharacters")) || this.savedCharacters
/**  menus object
 *      this.menus = [
        {
          "name": "file...",
          "show": false,
          "options": [
            {"name": "save", "function": this.fileSave() },
          ],
        },
        {
          "name": "reset...",
          "show": false,
          "options": [
            {"name": "scores", "function": this.resetSkillNames() },
            {"name": "name", "function": this.resetScores() },
            {"name": "all", "function": this.resetAll() },
          ],
        },
    ] */
    
  },
  watch: {
    "character": {
      deep: true,
      handler: function (after) {
        localStorage.setItem("character", JSON.stringify(after));
      },
    },
     "savedCharacters": {
      deep: true,
      handler: function (after) {
        localStorage.setItem("savedCharacters", JSON.stringify(after));
      },
    }, 
  },
  computed: {
    totalUsedPoints() {
      return ( (this.redSquares()*1) + (this.yellowSquares()*2) +(this.greenSquares()*3) + (this.purpSquares()*4) ) 
    },
    remainingPoints() { 
      return this.character.totalPoints - this.totalUsedPoints
    }
  },
  components: {
    /**SkillBox*/
  }
};
</script>

<template>
  <div class="max-w-md mb-4 pb-4 mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">

    <!-- App Menus --> 
    <div class="z-50 text-left pb-1 relative flex flex-row">
      <div class="z-50 text-left relative" v-clickOutside="hideFileMenu">
        <button 
          @click="showFileMenu = !showFileMenu"
          class="
                text-[16px] font-bold bg-slate-50 hover:bg-slate-200 transition-all
                rounded-full px-[16px] py-[4px] m-[2px] text-slate-800 focus:ring-2 ring-slate-500
          "
        >
          file...
        </button>  
        <transition
          enter-active-class="duration-100 ease-out"
          enter-from-class="transform opacity-0 -translate-y-6"
          enter-to-class="opacity-100"
          leave-active-class="duration-75 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0 -translate-y-6"
        >     
          <ul 
            class="flex flex-col absolute top-11 left-2
            border-2 p-2 bg-slate-200 rounded-sm w-fit"
            v-if="showFileMenu"
          >
            <li>
              <button 
                @click="newCharacter(); hideFileMenu();"
                class="
                  text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
                  rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
                  whitespace-nowrap
                "  
              >New Character</button>
            </li>
            <li>
              <button 
                @click="saveCharacter(); hideFileMenu();"
                class="
                  text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
                  rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
                  whitespace-nowrap
                "  
              >Save Character</button>
            </li>
            <div class="relative flex py-3 items-center">
                <span class="text-xs flex-shrink mx-4 text-gray-400">Saved Characters...</span>
            </div>
            <li
              v-for="character in savedCharacters"
              class="flex flex-nowrap items-stretch justify-end"
            >
              <button 
                @click="openCharacter(character.id); hideFileMenu();"
                class="
                  text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
                  rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
                  whitespace-nowrap
                " 
              >{{ character.name }}</button>
              <button
                @click="deleteCharacter(character.id);"
                class="text-white font-bold px-[0.6rem] h-8 self-end bg-red border-[2px] border-red rounded-full"
              >x</button>

            </li>
          </ul>
        </transition>
      </div>

      <!-- Reset Menu -->
      <div class="z-50 text-left relative" v-clickOutside="hideResetMenu">
        <button 
          @click="showResetMenu = !showResetMenu"
          class="
                text-[16px] font-bold bg-slate-50 hover:bg-slate-200 transition-all
                rounded-full px-[16px] py-[4px] m-[2px] text-slate-800 focus:ring-2 ring-slate-500
          "
        >
          reset...
        </button>    
        <transition
          enter-active-class="duration-100 ease-out"
          enter-from-class="transform opacity-0 -translate-y-6"
          enter-to-class="opacity-100"
          leave-active-class="duration-75 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0 -translate-y-6"
        >     
          <ul 
            class="flex flex-col absolute top-11 left-2
            border-[1px] p-2 bg-slate-50 rounded-sm min-w-fit"
            v-if="showResetMenu"
          >
            <li>
              <button 
                @click="resetScores(); hideResetMenu();"
                class="
                  text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
                  rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
                  whitespace-nowrap
                "  
              >scores</button>
            </li>
            <li>
              <button 
                @click="resetTotal(); hideResetMenu();"
                class="
                  text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
                  rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
                  whitespace-nowrap
                "  
              >total points</button>            
            </li>
            <li>
              <button 
                @click="resetCharacterName(); hideResetMenu();"
                class="
                  text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
                  rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
                  whitespace-nowrap
                "  
              >character name</button>            
            </li>
            <li>
              <button 
                @click="resetSkillNames(); hideResetMenu();"
                class="
                  text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
                  rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
                  whitespace-nowrap
                "  
              >skill names</button>            
            </li>
            <li>
              <button 
                @click="resetAll(); hideResetMenu();"
                class="
                  text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors 
                  rounded-full px-[16px] py-[4px] m-[2px] text-white focus:ring-2 ring-blue-500
                  whitespace-nowrap
                "  
              >all</button>
            </li>
          </ul>   
        </transition>
      </div>     
    </div>
    
    <!-- Top Bar --> 

    <div class="z-40 sticky top-[-2px] bg-slate-100 border-b-[3px] border-dotted border-slate-500">
      <!-- Menus -->
      <div class="">
        <div class="flex flex-row flex-nowrap justify-between">
        <!-- Character Name -->
          <div class="grow">
            <input 
              type="text" 
              placeholder="Character name..." 
              v-model="character.name"
              class="text-left w-full text-2xl md:text-3xl px-1 sm:px-2 py-1 border-[1px] border-slate-400 rounded-sm"
            />
          </div>  

          <!-- Total / Remaining -->

          <div class="z-50 relative pl-2 mr-3 sm:mr-0">
            <div class="text-2xl md:text-3xl whitespace-nowrap">
              {{ remainingPoints }} /&nbsp;
              <input 
                type="number" v-model="character.totalPoints" :min="character.totalPoints-remainingPoints" pattern="[0-9]*" inputmode="numeric"
                class="w-12 md:w-16 pl-1 py-1 border-[1px] border-slate-400 rounded" 
              />
            </div>
            <!-- Legend -->   
            <div class="text-xs md:text-sm absolute top-11 md:top-12 right-[0.75rem] md:right-[1.15rem]">Remaining / Total</div>  
          </div>
        </div>
      </div>

      <!-- Skill Pyramid -->

      <div class="flex md:flex-row flex-wrap justify-between">

        <!-- Legend -->

        <div class="z-50 pt-1 text-xl md:text-xl pr-2 pl-2 sm:pl-6 md:pl-8 text-right items-baseline overflow-clip">
          <ul class="flex flex-row flex-nowrap justify-end leading-none font-bold items-center"><span class="text-sm leading-none">Great (+4)</span>&nbsp;🟪&nbsp;<span class="w-4">{{ purpSquares() }}</span></ul>
          <ul class="flex flex-row flex-nowrap justify-end leading-none font-bold items-center"><span class="text-sm leading-none">Good (+3)</span>&nbsp;🟩&nbsp;<span class="w-4">{{ greenSquares() }}</span></ul>
          <ul class="flex flex-row flex-nowrap justify-end leading-none font-bold items-center"><span class="text-sm leading-none">Fair (+2)</span>&nbsp;🟨&nbsp;<span class="w-4">{{ yellowSquares() }}</span></ul>
          <ul class="flex flex-row flex-nowrap justify-end leading-none font-bold items-center"><span class="text-sm leading-none">Average (+1)</span>&nbsp;🟥&nbsp;<span class="w-4">{{ redSquares() }}</span></ul>
        </div>

        <!-- Squares -->

        <div class="z-50 pt-1 text-xl md:text-xl grow items-baseline">      
          <ul class="flex flex-row flex-nowrap leading-none items-baseline">&nbsp;<li v-for="n in purpSquares()">🟪</li></ul>
          <ul class="flex flex-row flex-nowrap leading-none items-baseline">&nbsp;<li v-for="n in greenSquares()">🟩</li></ul>
          <ul class="flex flex-row flex-nowrap leading-none items-baseline">&nbsp;<li v-for="n in yellowSquares()">🟨</li></ul>
          <ul class="flex flex-row flex-nowrap leading-none items-baseline">&nbsp;<li v-for="n in redSquares()">🟥</li></ul>     
        </div>  



        
      </div>
    </div>

    <!-- Skills --> 

    <div class="z-0 md:flex pt-2"> 
      <ul class="z-0 flex flex-wrap justify-around">
        <!--SkillBox
          v-for="(skill, index) in character.skills" 
          :key="skill"
          :skill="skill"
          class="
            z-0 w-1/3 rounded-sm bg-slate-200 m-1 p-[7px] max-w-[120px] h-[125px] border-[3px] overflow-hidden transition-colors duration-[43] ease-in-out
          "
          :class="[
            skill.value == 1 ? averageClass: '',
            skill.value == 2 ? fairClass: '',
            skill.value == 3 ? goodClass: '',
            skill.value == 4 ? greatClass: '',
          ]"
        /-->
        <li 
          v-for="(skill, index) in character.skills" 
          :key="skill" 
          class="
            z-0 w-1/3 rounded-sm bg-slate-200 m-1 p-[7px] max-w-[120px] h-[125px] border-[3px] 
            overflow-hidden
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
                z-20 opacity-100 text-[17px] py-[.6rem] my-[-5px] font-black 
                text-blue-dark disabled:text-blue-dark w-12
                bg-white rounded-full text-center rounded-full
                focus:outline-none focus:ring-2 focus:ring-blue-dark
              " 
            /> 
          </div>
          <button 
            @click="skill.value--;" :disabled="skill.value < 1" 
            class="
              z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light transition-colors 
              rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white 
              focus:ring-2 ring-blue-light disabled:bg-slate-300
            "
          >
              -
          </button>
          <button 
            @click="skill.value++;" :disabled="((skill.value > 3) || remainingPoints <= 0)" 
            class="
              z-30 text-[16px] font-black bg-blue-dark hover:bg-blue-light transition-colors 
              rounded-full px-[16px] sm:px-[16px] py-[8px] sm:py-[8px] mx-[2px] sm:mx-[2px] mb-[2px] mt-[-12px] text-white 
              focus:ring-2 ring-blue-light disabled:bg-slate-300
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


  </div>
  <div class="pb-4">
    <a class="underline" target="new" href="https://github.com/johncarmack1984/toh-skill-builder">TOH Skill Builder</a> 
    by <a class="underline" href="https://github.com/johncarmack1984">John Carmack</a>
  </div>
</template>

