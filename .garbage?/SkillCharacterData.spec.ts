/*

import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing';
import SkillCharacterData from "../SkillCharacterData.vue";


test('data', () => {
  const wrapper = mount(SkillCharacterData, {
    global: {
      plugins: [createTestingPinia()],
    },
  })

  const myTohSkillBuilder = createTestingPinia();

  myTohSkillBuilder.$patch({
    character: { 
      characterName: "Test Character", 
      totalPoints: 17, 
    }, 
    remainingPoints: 15
  });

  const characterName = wrapper.find('input[type="text"]');

  expect(characterName.element.value).toBe("Test Character");

  const totalPoints = wrapper.find('input[type="number"');

  expect(totalPoints.element.value).toBe("17");

  const remainingPoints = wrapper.get('[data-test="remainingPoints"]');

  expect(remainingPoints.text()).toBe("15 /");
});

*/