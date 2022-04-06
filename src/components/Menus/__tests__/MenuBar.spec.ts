import { describe, it } from "vitest";
import { factory } from "@/components/__tests__/index";;
import MenuBar from '@/components/Menus/MenuBar.vue';
import { expect } from "chai";

describe("MenuBar", () => {
    it("renders the menu buttons", async () => {
        // instantiate component and state
        const { wrapper, myTohSkillBuilder } = await factory(MenuBar, { shallow: true });        

       console.log(wrapper.html()) 
    
    });

});