<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["item"],
  emits: ["hideMenu"],
});
</script>

<template>
  <div v-if="item.type === 'button'">
    <button
      @click="
        item.action();
        $emit('hideMenu');
      "
      class="text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors rounded-full px-[16px] py-[4px] self-start m-[2px] text-white focus:ring-2 ring-blue-500 whitespace-nowrap"
      :data-testid="`button-${item.label}`"
    >
      {{ item.label }}
    </button>
  </div>
  <div
    v-if="item.type === 'character'"
    class="flex flex-nowrap items-stretch justify-end"
  >
    <button
      @click="
        item.open();
        $emit('hideMenu');
      "
      :data-testid="`open-character-${item.label}`"
      class="text-white text-[16px] font-bold bg-blue-dark hover:bg-blue-light transition-colors rounded-full px-[16px] py-[4px] m-[2px] focus:ring-2 ring-blue-500 whitespace-nowrap"
    >
      {{ item.label }}
    </button>
    <button
      @click="item.delete()"
      class="text-white font-bold bg-red hover:bg-red-light transition-colors rounded-full px-[0.6rem] h-8 self-end border-[2px] border-red"
      :data-testid="`delete-character-${item.label}`"
    >
      x
    </button>
  </div>

  <div
    v-if="item.type === 'subheading'"
    class="relative flex py-3 items-center"
    :data-testid="`subheading-${item.label}`"
  >
    <span class="text-xs flex-shrink mx-4 text-gray-600">
      {{ item.label }}...
    </span>
  </div>
</template>
