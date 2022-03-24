<script lang="ts">
import { defineComponent } from "vue";
import MenuBarButton from './MenuBarButton.vue'

export interface MenuObjec {
    [key: string]: any;
}

export interface MenuBank {
    [key: string]: MenuObject;
}

const clickOutside = {
    mounted: (el: any, binding: any, vnode: any) => {
        el.clickOutsideEvent = function(event: any) {
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
    data() {
        return {
            showMenuValue: false,
        }
    },
    components: {
        MenuBarButton,
    },
    setup() {
        const MenuOptions: Array<String> = ['new character','save character']
        return {
            MenuOptions
        }
    },      
    methods: {
        toggleShowMenu() { this.showMenuValue = !this.showMenuValue; },
        hideMenu() {  this.showMenuValue = false; },
    },
    mounted() {
        console.log(this.menu.items)
    },
})
</script>

<template>   

    <div class="z-50 text-left relative" v-clickOutside="hideMenu">


        <menu-bar-button :label="menu.label" @button-event="toggleShowMenu()"></menu-bar-button>
    

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
            v-if="showMenuValue"
        >
            <li v-for="item in menu.items">{{item.label}}</li>
        </ul>
        
        </transition>

    </div>

</template>