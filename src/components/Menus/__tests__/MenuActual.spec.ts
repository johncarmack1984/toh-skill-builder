/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it } from "vitest";
import { factory } from "../../__tests__/index";
import MenuActual from "@/components/Menus/MenuActual.vue";
import { expect } from "vitest";
import type { DefineComponent } from "vue";

const sampleMenu = {
  label: "test menu",
  items: [
    {
      label: "test option",
      type: "button",
      action: () => {},
    },
    {
      label: "test subheading",
      type: "subheading",
      action: undefined,
    },
    {
      label: "test character",
      type: "character",
      open: () => {},
      delete: () => {},
    },
  ],
};

describe("MenuActual", async () => {
  it("renders only the open button at initialization", async () => {
    // instantiate component and state
    const { wrapper } = factory(MenuActual as unknown as DefineComponent, {
      shallow: false,
      props: {
        menu: sampleMenu,
      },
    });

    expect(wrapper.vm.showMenuValue).toBe(false);
  });

  it("renders menu visible when open button is clicked", async () => {
    // instantiate component and state
    const { wrapper } = factory(MenuActual as unknown as DefineComponent, {
      shallow: false,
      props: {
        menu: sampleMenu,
      },
    });

    await wrapper
      .find('[data-testid="menu-open-button-test menu"]')
      .trigger("click");

    expect(wrapper.vm.showMenuValue).toBe(true);

    for (const [index, item] of sampleMenu.items.entries()) {
      const testValue = wrapper
        .find(`[data-testid="menu-option-li-${index}"]`)
        .text();

      const validator = item.label;

      expect(testValue).includes(validator);
    }
  });
});
