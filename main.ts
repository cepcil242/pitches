// A Day of One-Line Pitches — entry for make.fun competition
// u-ronigrv-a-day-of-one-line-pitches-12cd9bb3
//
// main.ts (Node 22, standard library only, no network) writes one sentence
// of 1–240 characters to /output/entry.txt (or $ENTRY_OUTPUT_PATH when set).
// The sentence is meant to convince a friend who has never coded to let an
// AI agent build their first app idea on make.fun.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "That app idea you've been carrying around? Just describe it on make.fun in your own words and an AI agent will build a first version you can tap and try — free to enter, and if it's not right, you've lost nothing but a few minutes.";

// The gate: the sealed scorer checks that /output/entry.txt is UTF-8 text
// of 1 to 240 characters, not only white space, and gives the entry a Valid
// column of 1 or 0. Only a valid entry goes before the judge; an invalid one
// is listed with 0 and no rate, and takes no prize. So validate before
// writing anything: reject empty/whitespace-only text and text outside
// 1–240 characters by throwing, which exits 1 and writes nothing.
export function validateEntry(text: string): number {
  if (text.trim().length === 0) {
    throw new Error("entry text must not be empty or whitespace-only");
  }
  const chars = [...text].length;
  if (chars < 1 || chars > 240) {
    throw new Error(`entry text must be 1-240 characters, got ${chars}`);
  }
  return chars;
}

function main(): void {
  const text = ENTRY;
  validateEntry(text);

  const out = process.env.ENTRY_OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, text, "utf8");
}

main();
