import { createRouter, createWebHistory } from "vue-router";
import SkillBuilder from "../views/SkillBuilder.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "skillbuilder",
      component: SkillBuilder,
    }, 
    {
      path: "/share",
      name: "share",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import("../icons/HelloWorld.vue"),
      component: SkillBuilder
    }, 
  ],
});

export default router;
