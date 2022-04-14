import skills from "./skills";
import character from "./character";
import savedCharacters from "./savedCharacters";

export const migrationSetup = () => {
  localStorage.setItem(
    "skills",
    JSON.stringify(skills._62186e88225ab700089a360f)
  );
  localStorage.setItem("total", JSON.stringify(20));
  localStorage.setItem(
    "character",
    JSON.stringify(character._4e2b9197daa2aeccb4caf39ac052b96fe1f1f49d)
  );
  localStorage.setItem(
    "savedCharacters",
    JSON.stringify(savedCharacters._4e2b9197daa2aeccb4caf39ac052b96fe1f1f49d)
  );
};
