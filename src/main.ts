import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import './index.css'

const app = createApp(App);

app.directive('clickOutside', {
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
});


app.use(createPinia());
app.use(router);
/*
router.beforeEach((to) => {
    const character = useCharacterStore(pinia)
})
*/
app.mount("#app");
