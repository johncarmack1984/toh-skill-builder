import { defineStore, acceptHMRUpdate, type StateTree } from "pinia";
import { useUserStore } from './user';


export const useMenuStore = defineStore({
    id: "menus",
    state: () => ([
        fileMenu,
        resetMenu,
    ]) as StateTree,
    getters: {
    },
    actions: {
        /* isVariableUnset (variable) { return ( variable === "" || typeof variable === 'undefined' || variable === null ) }, */
        /* createCharacter(character) { this.savedCharacters.push(character); console.log("character " + this.character.name + " added to savedCharacters") }, */
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
          
    },
});


export interface MenuAction {
    label: string,
    action?: Function
}

export interface Menu {

}

export interface MenuBank {
    //[key: string]: MenuAction;
    //Array<MenuAction>
}

const newCharacterMenuAction: MenuAction = { 'label': 'New Character', 'action': function() {console.log('newCharacter')} }        
const saveCharacterMenuAction: MenuAction = { 'label': 'Save Character', 'action': function() { console.log('saveCharacter') } }
const savedCharactersSubMenuHeading: MenuAction = { 'label': 'Saved characters...', 'action': null}


const fileMenu: Menu = {
    label: 'file',
    items: [
        newCharacterMenuAction,
        saveCharacterMenuAction,
        savedCharactersSubMenuHeading,
    ],
}

const resetScoresMenuAction: MenuAction = { 'label': 'scores', 'action': function() { console.log('resetScores') } }
const resetTotalPointsMenuAction: MenuAction = { 'label': 'total points', 'action': function() { console.log('resetTotalPoints') } }
const resetCharacterNameMenuAction: MenuAction = { 'label': 'character name', 'action': function() { console.log('resetCharacterName') } }
const resetSkillNamesMenuAction: MenuAction = { 'label': 'skill name', 'action': function() { console.log('resetSkillName') } }
const resetAllMenuAction: MenuAction = { 'label': 'all', 'action': function() { console.log('resetAll') } }


const resetMenu: Menu = {
    label: 'reset',
    items: [
        resetScoresMenuAction,
        resetTotalPointsMenuAction,
        resetCharacterNameMenuAction,
        resetSkillNamesMenuAction,
        resetAllMenuAction,
    ]
}


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate( useMenuStore, import.meta.hot))
  }