<script lang="ts">
import { defineComponent } from "vue";
import MenuButton from './MenuButton.vue'

const clickOutside = {
    mounted: (el: { clickOutsideEvent: { (event: any): void; (this: HTMLElement, ev: MouseEvent): any; }; contains: (arg0: any) => any; }, binding: { value: (arg0: any, arg1: any) => void; }, vnode: any) => {
        el.clickOutsideEvent = function(event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: { clickOutsideEvent: (this: HTMLElement, ev: MouseEvent) => any; }) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
};

export default defineComponent({
    props: ['menu'],
    directives: {
        clickOutside,
    },
    components: {
        MenuButton,
    },
    setup() {
        const showMenu: Boolean = false
        const MenuOptions: Array<String> = ['new character','save character']
        return {
            showMenu,
            MenuOptions
        }
    },      
    methods: {
        toggleShow () { this.showMenu = !this.showMenu; console.log(this.showMenu); },
        hideMenu() { this.showMenu = false; console.log(this.showMenu) },
    }
})
</script>

<template>   
    <div class="z-50 text-left pb-1 relative flex flex-row">
      <div class="z-50 text-left relative" v-clickOutside="toggleShow"></div>
        <MenuButton label="file" @button-event="showMenu = !showMenu" />
        
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
            v-if="(showMenu == true)"
          >
            <li>hello</li>
          </ul>
        
        </transition>


    </div>    
</template>