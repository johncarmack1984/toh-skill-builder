

/* createCharacter(character) { this.savedCharacters.push(character); console.log("character " + this.character.name + " added to savedCharacters") }, */

export const createCharacter: Function name:(params:type) {  
}(character: Character, savedCharacters) { 
  savedCharacters.push(character)
}

isDefaultCharacter(character: Character) {
  console.log('isDefaultCharacter?')
  /* return JSON.stringify(this.$data.character) === JSON.stringify(this.$options.data().character) */

  /* saveCharacter () { 
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
      }

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
  }, */
  /*  newCharacter () {
          console.log("is default? " + JSON.stringify(this.isDefaultCharacter()))
          // if the character in state has changed from default, save character
          if (!this.isDefaultCharacter()) { this.saveCharacter() }
          this.character = this.$options.data().character
          console.log("new character")
  }, */
  /* updateCharacter(characterIndex) { this.savedCharacters[characterIndex] = this.character }, */
  /* openCharacter (id) { 
      // if the current character is diff from default, save open character
      if (!this.isDefaultCharacter()) { this.saveCharacter() }
      // open character from saved array by character id
      this.character = this.savedCharacters.find(obj => { return obj.id === id } )
      console.log("character opened")
  }, */ 
  /* deleteCharacter (id) {
  var deleteIndex = this.savedCharacters.findIndex(obj => { return obj.id === id } )
  console.log("deleting character " + id + " at index " + deleteIndex)
  if (this.character.id === this.savedCharacters[deleteIndex].id) { this.resetAll() }
  this.savedCharacters.splice(deleteIndex, 1) 
  }, */        
  //getUserCharacters(user) { return user.$state.savedCharacters },
  /* resetCharacterName () { this.$data.character.name = "" },
  resetSkillNames () { this.$data.character.skills.forEach( (skill,index) => skill.name = this.$options.data().character.skills[index].name) },
  resetScores () { this.$data.character.skills.forEach( (skill,index) => skill.value = 0) },
  resetTotal() { this.character.totalPoints = this.$options.data().character.totalPoints },
  resetAll () { 
  this.resetScores()
  this.resetCharacterName()
  this.resetSkillNames()
  this.resetTotal()
  }, */  
  
//user actions 
  getUser() {
    /** remove old skills & replace with new character.skills */
    //if (this.character.skills = JSON.parse(localStorage.getItem("skills"))) { localStorage.removeItem("skills") } 
    /** if exists, sync browser with localStorage */
    //if (this.character.totalPoints = JSON.parse(localStorage.getItem("total"))) { localStorage.removeItem("total") }
    //if this.isVariableUnset(this.character.totalPoints))
    /* below: original uncommented toh-skill-builder code for mounted() {}:
    this.character = JSON.parse(localStorage.getItem("character")) || this.character
    this.savedCharacters = JSON.parse(localStorage.getItem("savedCharacters")) || this.savedCharacters
    */
  },

  deleteAllMyStuff() {

    // done? maybe force a reload      
    // remove all proof of this app's existence from your device, for a few milliseconds.
    // old data is replaced with a blank slate.
    // (emergencies only, cannot be undone)
    // localStorage.removeItem('my-toh-skill-builder'); 
    this.$reset()

  },         
  migrateOldLocalStorageCharacters() {
    // what's in localStorage?
    // console.log('localStorage: ' + JSON.stringify(localStorage))    
    // which permutation does it have?
    // code
    // copy those permutations to the new model  
    // code
    //trying to get here:
    /*localStorage.removeItem('skills');      
    localStorage.removeItem('total');      
    localStorage.removeItem('character');      
    localStorage.removeItem('savedCharacters');
    localStorage.removeItem('size');*/
  },
  setLocalStorageSize() {
    console.log('localStorage will be set here in the future')
    // for use when it's time to implement an undo... I waste dtoo much time on it today
    /*
    console.log(JSON.stringify(this.$state.userLocalStorage.prefs))
    console.log(/*JSON.stringify/this.userLocalStorage.prefs.localStorageSize)
    const userLocalStorage: UserLocalStorage = this.userLocalStorage
    //this.deleteAllMyStuff();
    // if localStoage exists, and user's cache is set to zero (the default),
    /*
    if (localStorage && ((this.$state.userLocalStorage.prefs.localStorageSize === 0) || (this.$state.userLocalStorage.prefs.localStorageSize === undefined))) {
      var i = 0;
      try {
          // test up to 10 MB 
          for (i = 250; i <= 10000; i += 250) {
              localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
          }
      } catch (e) {
          // delete test object
          localStorage.removeItem('test');
          // set user's localStorage pref, 
          this.$state.prefs.localStorageSize = i - 250;    
      }        
    }
    else {
      // no localstorage or cache size alrady set
    }
    */
  },


  createCharacter(character: Character) { 
    //const characterStore = useCharacter()
    //const savedCharacters: array = this.userLocalStorage.savedCharacters)
    //this.userLocalStorage.savedCharacters.push(character); 
    console.log("creating to be implemented") 
  },    
  saveCharacter() {
    console.log('saving to be implemented')
    // if character is unnamed, give name "Unnamed (x)"
    /*if (this.isVariableUnset(this.character.name)) { 
      var unnamedArray = this.savedCharacters.filter(function (character) { return character.name.includes("Unnamed ")})      
      var unnamedIndex = unnamedArray.length
      this.character.name = "Unnamed " + unnamedIndex
    }
    console.log(this.character.name + " saving")
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
    */      
  },
  openCharacter() {},  