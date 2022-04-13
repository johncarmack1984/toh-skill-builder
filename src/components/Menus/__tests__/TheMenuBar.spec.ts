import { describe, it } from "vitest";
import { factory } from "@/__tests__/index";
import { flushPromises } from "@vue/test-utils";
import TheMenuBar from "@/components/Menus/TheMenuBar.vue";
import { expect } from "vitest";
import { defineComponent, type DefineComponent } from "vue";

describe("TheMenuBar", () => {
  it("renders the menu open buttons", async () => {
    // instantiate component and state
    const { wrapper } = factory(TheMenuBar as DefineComponent, {
      shallow: false,
    });

    /*for (const [index, menu] of wrapper.vm.menus.entries()) {
      //expect(wrapper.find(`'data-testid="menu-actual-component-${index}`)).toBeTypeOf(defineComponent)
      console.log(
        wrapper.find(`[data-testid="menu-actual-component-${index}"]`).html()
      );
      await wrapper
        .find(`[data-testid="menu-actual-component-${index}"]`)
        .trigger("click");
      await flushPromises();
      console.log(
        wrapper.find(`[data-testid="menu-actual-component-${index}"]`).html()
      );
      //console.log(menu)
    }*/

    expect(wrapper.vm.menus.length).toBe(2);
  });
});
