<script>

export default {
  name: "App",
  directives: {

  },
  data() {
    return { 

      savedCharacters: [ ],

    };
  },
  methods: {
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
};
</script>

<template>
@click="newCharacter(); hideFileMenu();"
@click="saveCharacter(); hideFileMenu();"
@click="openCharacter(character.id); hideFileMenu();"
@click="deleteCharacter(character.id);"
@click="resetScores(); hideResetMenu();"
@click="resetTotal(); hideResetMenu();"
@click="resetCharacterName(); hideResetMenu();"
@click="resetSkillNames(); hideResetMenu();"
@click="resetAll(); hideResetMenu();"
    
