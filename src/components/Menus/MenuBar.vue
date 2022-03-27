<script lang="ts">
import { defineComponent } from "vue";
//import { Menus } from '../../directives/menu'
import MenuActual from './MenuActual.vue';
/* import { RouterLink } from "vue-router"; */

export interface MenuAction {
    label: string,
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
        /* RouterLink, */
    },
    setup(props) {
        const newCharacterMenuAction: MenuAction = { 'label': 'New Character', 'action': function() {console.log('newCharacter')} }        
        const saveCharacterMenuAction: MenuAction = { 'label': 'Save Character', 'action': function() { console.log('saveCharacter') } }
        const savedCharactersSubMenuHeading: MenuAction = { 'label': 'Saved characters...', 'action': undefined  }
        const fileMenu: Menu = {
            label: 'file',
            items: [ newCharacterMenuAction, saveCharacterMenuAction, savedCharactersSubMenuHeading, ],
        };
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