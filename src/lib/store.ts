import { writable } from "svelte/store";
import type { Result } from "./models/Result";

export const apiResult = writable<Result[]>([]);