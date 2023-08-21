import { atom } from "recoil";
import keys from "../keys";
import { TodoInput } from "@atul24112001/cohort_todo_common";

export interface Todo extends TodoInput {
  id: number;
  //   title: string;
  //   description: string;
  //   done: boolean;
}

const todoState = atom({
  key: keys.TODO_STATE,
  default: [] as Todo[],
});

export default todoState;
