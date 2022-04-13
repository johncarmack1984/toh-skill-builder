/* eslint-disable @typescript-eslint/no-empty-function */
import { flushPromises } from "@vue/test-utils";
import { vi, describe, expect, it } from "vitest";
import { factory } from "@/__tests__/index";
import MenuActual from "@/components/Menus/MenuActual.vue";
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

    expect(wrapper.vm.showMenu).toBe(false);
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

    expect(wrapper.vm.showMenu).toBe(true);

    for (const [index, item] of wrapper.vm.menu.items.entries()) {
      expect(
        wrapper
          .find(`[data-testid="menu-option-li-${index}"]`)
          .text()
          .includes(item.label)
      ).toBe(true);
    }
  });

  it("closes the menu when hideMenu is called", async () => {
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

    await flushPromises();

    await wrapper
      .find('[data-testid="menu-open-button-test menu"]')
      .trigger("click");

    await flushPromises();

    expect(wrapper.vm.showMenu).toBe(false);
  });
});
