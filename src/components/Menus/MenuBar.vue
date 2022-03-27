<script lang="ts">
import { defineComponent, reactive } from "vue";
//import { Menus } from '../../directives/menu'
import MenuActual from './MenuActual.vue';
import { getActivePinia } from "pinia";
/* import { RouterLink } from "vue-router"; */
import { reactive, computed } from 'vue'

export interface MenuAction {
    label: string,
    type?: string,
    action?: Function
}

export interface Menu {
    label: string,
    items: Array<MenuAction>
}

export interface MenuBank {
    label: string,
    items: Array<Menu>; 
}


export default defineComponent({
    props: ['user'],
    components: {
        MenuActual
        /* RouterLink, <-- you're leaving this here to remind you to implement character sharing */
    },
    setup(props) {
        const pinia = getActivePinia()
        const newCharacterMenuAction: MenuAction = { 'label': 'New Character', 'action': function() { }   }     
        /* this one works FYI */
        const saveCharacterMenuAction: MenuAction = { 
            'label': 'Save Character', 'action': function() { 
                pinia?.state.value.user.savedCharacters.push(pinia?.state.value.user.openCharacter) 
                /*pinia?.state.value.user.savedCharacters.forEach(character => { console.log(character.characterName) });*/
            } 
        } 
        /*const saveCharacterMenuAction: MenuAction = { 'label': 'Save Character', 'action': function() { pinia?.state.value.user.$patch((state) => { state.value.user.savedCharacters.push(state.value.user.openCharacter) } ) } } */
        const savedCharactersSubMenuHeading: MenuAction = { 'label': 'Saved characters...', 'action': undefined  }
        /*const savedCharactersMenuButtons = function (pinia?.state.value.user.savedCharacters) => {
            return [
                ...pinia?.state.value.user.savedCharacters.map(
                    character => {
                        return { 
                            'label': character.characterName, 'type': 'character', 'action': function () { } 
                        }
                    }
                )
            ]
        }*/
        const savedCharactersMenuButtons = []

        const fileMenu = {
                label: 'file',
                items: [ 
                    newCharacterMenuAction, 
                    saveCharacterMenuAction, 
                    savedCharactersSubMenuHeading, 
                    ...savedCharactersMenuButtons
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
        const menus = [ fileMenu, resetMenu ]    
        return {
            menus,
            props,
        }
    },
    watch: {
        "pinia.state.value.user.savedCharacters": {
            // sync the user's open character with the app's openCharacter
            deep: true,
            handler: function (after) {
                /* this.user.$patch((state) => {
                state.openCharacter = this.pinia?.state.value.character */
                /*this.*/
                console.log(after)
            }    
        },
    },     
    mounted() {
        //console.log(this.menus.$state);
    }
})
</script>

<template>
    <div class="z-50 text-left pb-1 relative flex flex-row">
          <MenuActual v-for="(menu, index) in menus" :key="index" :menu="menu" />
          <!--RouterLink "share character, URL will contain character values which will auto-save to localStorage"-->    
    </div>
</template>