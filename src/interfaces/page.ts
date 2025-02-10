import { Component } from "@/interfaces/component";

export interface Page {
  id: number;
  step: number;
  components?: Component[]
}