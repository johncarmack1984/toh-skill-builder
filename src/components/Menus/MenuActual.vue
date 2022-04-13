<script setup lang="ts">
import { ref } from "vue";
import MenuBarButton from "./MenuBarButton.vue";
import MenuActualButton from "./MenuActualButton.vue";

let showMenu = ref(false);

function hideMenu() {
  showMenu.value = false;
}

defineProps({
  menu: Object,
});
</script>

<template>
  <div class="z-50 text-left relative" v-clickOutside="hideMenu">
    <MenuBarButton
      :label="menu.label"
      @button-event="showMenu = !showMenu"
      :data-testid="`menu-open-button-${menu.label}`"
    />
    <transition
      enter-active-class="duration-100 ease-out"
      enter-from-class="transform opacity-0 -translate-y-6"
      enter-to-class="opacity-100"
      leave-active-class="duration-75 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0 -translate-y-6"
    >
      <ul
        class="flex flex-col absolute top-11 left-2 border-[1px] p-2 bg-slate-50 rounded-sm min-w-fit"
        v-if="showMenu"
        :data-testid="`menu-actual-${menu.label}`"
      >
        <li
          v-for="(item, index) in menu.items"
          :key="index"
          :data-testid="`menu-option-li-${index}`"
        >
          <MenuActualButton :item="item" @hide-menu="hideMenu" />
        </li>
      </ul>
    </transition>
  </div>
</template>
