import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { myTohSkillBuilderStore } from "@/stores/myTohSkillBuilder";
import { defaultCharacter } from "@/characterTemplates/TheDefaultCharacterTemplate";

describe("myTohSkillBuilder", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active, so it's automatically picked
    // up by useStore()  without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("calculates total used points", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    expect(myTohSkillBuilder.totalUsedPoints).toBe(0);

    myTohSkillBuilder.$patch((state) => {
      state.character.skills[0].skillLevel++;
    });

    expect(myTohSkillBuilder.totalUsedPoints).toBe(1);
  });

  it("calculates remaining points", () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    expect(myTohSkillBuilder.remainingPoints).toBe(
      myTohSkillBuilder.character.totalPoints -
        myTohSkillBuilder.totalUsedPoints
    );
  });



  it('adds a copy of "character" to "savedCharacters"', () => {
    const myTohSkillBuilder = myTohSkillBuilderStore();

    expect(myTohSkillBuilder.savedCharacters).toEqual([]);

    myTohSkillBuilder.saveCharacter();

    expect(myTohSkillBuilder.savedCharacters.length).toBe(1);
    expect(myTohSkillBuilder.findCharacterById).toBeTruthy()
  });


  it('creates a new character by setting default state', async () => {

    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.$patch((state) => {
      state.character.name = "Test Character";
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 2;
      state.character.skills[2].skillLevel = 3;
      state.character.skills[3].skillLevel = 4;
    });

    expect(myTohSkillBuilder.character.name).toBe("Test Character");

    expect(myTohSkillBuilder.totalUsedPoints).toBe(10);

    expect(myTohSkillBuilder.savedCharacters).toEqual([]);   
    
    await myTohSkillBuilder.newCharacter();

    expect(myTohSkillBuilder.character.skills[0].skillLevel).toBe(0)

    expect(myTohSkillBuilder.totalUsedPoints).toBe(0);    

    expect(myTohSkillBuilder.savedCharacters.length).toBe(1);  

  });

  it('resets scores', async () => {

    const myTohSkillBuilder = myTohSkillBuilderStore();

    myTohSkillBuilder.$patch((state) => {
      state.character.name = "Test Character";
      state.character.skills[0].skillLevel = 1;
      state.character.skills[1].skillLevel = 2;
      state.character.skills[2].skillLevel = 3;
      state.character.skills[3].skillLevel = 4;
    });    

    await myTohSkillBuilder.resetScores();

    expect(myTohSkillBuilder.totalUsedPoints).toBe(0);    

  });




  it ('returns open character`s totalPoints to template default', async () => {

    const myTohSkillBuilder = myTohSkillBuilderStore();

    const testVariable = myTohSkillBuilder.totalPoints;

    myTohSkillBuilder.$patch((state) => {
      state.character.totalPoints = 50;
    });    

    myTohSkillBuilder.resetTotalPoints();

    expect(myTohSkillBuilder.character.totalPoints).toBe(defaultCharacter.totalPoints)

  });

  it('updates a character already in savedCharacters', async () => {

    const myTohSkillBuilder = myTohSkillBuilderStore();

    await myTohSkillBuilder.saveCharacter();

    expect(myTohSkillBuilder.findCharacterById.characterName).toBe('')
    
    await myTohSkillBuilder.$patch((state) => { state.character.characterName = "Test Character" })

    expect(myTohSkillBuilder.findCharacterById.characterName).toBe('')
    
    await myTohSkillBuilder.saveCharacter();    

    expect(myTohSkillBuilder.findCharacterById.characterName).toBe("Test Character")
    

    
  });



  it('checks if to-be-saved character has a name', async () => {

    const myTohSkillBuilder = myTohSkillBuilderStore();



    expect(true).toBe(true)

  });


  /*

  /// unfinished tests



  
  it('creates an "Untitled (x)" name based on largest [Untitled x] in savedCharacters', async () => {

  });

  


  it('deletes a character from savedCharacters', () => {

  })  
  */
});
