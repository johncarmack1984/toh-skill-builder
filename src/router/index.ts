import { createRouter, createWebHistory } from "vue-router";
import TheSkillBuilder from "../views/TheSkillBuilder.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "theskillbuilder",
      component: TheSkillBuilder,
    },
    {
      path: "/share",
      name: "share",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import("../icons/HelloWorld.vue"),
      component: TheSkillBuilder,
    },
  ],
});

export default router;
