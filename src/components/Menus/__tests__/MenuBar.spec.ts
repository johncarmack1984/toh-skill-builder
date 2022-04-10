import { describe, it } from "vitest";
import { factory } from "../../__tests__/index";
import MenuBar from "@/components/Menus/MenuBar.vue";
import { expect } from "vitest";
import type { DefineComponent } from "vue";

describe("MenuBar", () => {
  it("renders the menu open buttons", () => {
    // instantiate component and state
    const { wrapper } = factory(MenuBar as DefineComponent, {
      shallow: true,
    });

    expect(wrapper.vm.menus.length).toBe(
      wrapper.findAll("menu-actual-stub").length
    );
  });
});