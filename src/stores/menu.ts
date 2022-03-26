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
        newCharacter() {},
        saveCharacter() {},
        openCharacter() {},
        //getUserCharacters(user) { return user.$state.savedCharacters },
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