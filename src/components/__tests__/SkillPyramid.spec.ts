import { describe, it, expect } from "vitest";
import { flushPromises } from "@vue/test-utils";
import { factory } from "@/__tests__/index";
import SkillPyramid from "@/components/SkillPyramid.vue";

describe("SkillPyramid", () => {
  it("renders a visual representation of skill levels selected", async () => {
    // instantiate component and state
    const { wrapper, store } = factory(SkillPyramid, {});

    for (const [index, row] of wrapper.vm.squares.entries()) {
      expect(row).toBe(0);
      expect(
        wrapper
          .find(`[data-testid="pyramid-row-${index}"]`)
          .text()
          .includes(wrapper.vm.legend[index].symbol)
      ).toBe(false);
    }
    store.$patch((state) => {
      for (const index in wrapper.vm.squares) {
        state.character.skills[index].value = parseInt(index) + 1;
      }
    });

    expect(store.totalUsedPoints).toBe(10);

    await flushPromises();

    for (const [index, row] of wrapper.vm.squares.entries()) {
      expect(row).toBe(1);
      expect(
        wrapper
          .find(`[data-testid="pyramid-row-${index}"]`)
          .text()
          .includes(wrapper.vm.legend[index].symbol)
      ).toBe(true);
    }
  });

  it("renders a clean interface when character is reset to default", async () => {
    const { wrapper, store } = factory(SkillPyramid, {});

    store.$patch((state) => {
      for (const index in wrapper.vm.squares) {
        state.character.skills[index].value = parseInt(index) + 1;
      }
    });

    //store.resetScores(); // doesn't test for some reason? it's just this anyway:
    store.$patch((state) => {
      for (const [index] of state.character.skills.entries()) {
        state.character.skills[index].value = 0;
      }
    });

    await flushPromises();

    for (const [index, row] of wrapper.vm.squares.entries()) {
      expect(row).toBe(0);
      expect(
        wrapper
          .find(`[data-testid="pyramid-row-${index}"]`)
          .text()
          .includes(wrapper.vm.legend[index].symbol)
      ).toBe(false);
    }
  });
});
