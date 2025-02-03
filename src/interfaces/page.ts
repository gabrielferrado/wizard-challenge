import { Component } from "@/interfaces/component";

export interface Page {
  id: number;
  pageNumber: number;
  components?: Component[]
}