import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Word From Grandma: the single word a grandma would text about AI.
// "robit" is her own spelling of robot: warm, a little baffled, tied to
// the machine itself, and funny with no caption at all. One word, five
// letters, no punctuation tricks, inside the sealed gate of 1-30 chars.
const WORD = "robit";
if (!/^[A-Za-z]+$/.test(WORD) || WORD.length < 1 || WORD.length > 30) {
  throw new Error(`entry must be one word of 1-30 letters, got ${JSON.stringify(WORD)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");

// Read back and verify: the file on disk must be byte-identical to the
// word, so a partial write or encoding slip can never ship silently.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== WORD) {
  throw new Error("entry.txt on disk does not match the word");
}
