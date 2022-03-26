import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import clickOutside from './directives/clickOutside'
import './index.css'

const app = createApp(App);

app.directive('clickOutside', clickOutside);


app.use(createPinia());


app.use(router);
app.mount("#app"); 

// clear console on hot refresh
if (import.meta.hot) {
    import.meta.hot.on(
      "vite:beforeUpdate",
      () => console.clear()
    );
  } 

