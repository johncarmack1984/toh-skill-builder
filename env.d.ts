/// <reference types="vite/client" />
declare module "mock-local-storage";

export type skill = {
  id: number;
  name: string;
  value: number;
};

interface Skill {
  id: string;
  name: string;
  value: number;
}

export type character = {
  name: string;
  totalPoints: number;
  skills: array<skill>;
  id: string;
};

export type skill00 = {
  name: string;
  value: number;
};

export type skills00 = skill00[];

export type character00 = {
  id: string;
  name: string;
  totalPoints: number;
  skills: skills00[];
};
