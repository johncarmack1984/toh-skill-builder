import { App } from "vue";
import clickOutside from "./clickOutside";

export function registerDirectives(app: App): void {
  app.directive("clickOutside", clickOutside);
}
