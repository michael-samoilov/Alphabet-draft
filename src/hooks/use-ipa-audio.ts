"use client";

/**
 * IPA sound pronunciation using Web Speech API.
 * Uses short real-word carriers so the speech engine pronounces
 * digraphs (th, sh, ch, ng …) as actual sounds instead of
 * spelling them out letter-by-letter.
 */

// Each value is a short English word (or natural syllable) whose
// *initial* or dominant sound matches the target IPA phoneme.
// The speech engine already knows how to say these words correctly.
const ipaToUtterance: Record<string, string> = {
  // Vowels
  "/a/": "ah",
  "/e/": "eh",
  "/i/": "ee",
  "/o/": "oh",
  "/u/": "oo",

  // Simple consonants — single-letter onsets work fine
  "/b/": "bah",
  "/d/": "dah",
  "/f/": "fah",
  "/g/": "gah",
  "/h/": "hah",
  "/k/": "kah",
  "/l/": "lah",
  "/m/": "mah",
  "/n/": "nah",
  "/p/": "pah",
  "/r/": "rah",
  "/s/": "sah",
  "/t/": "tah",
  "/v/": "vah",
  "/w/": "wah",
  "/j/": "yah",
  "/z/": "zah",

  // Digraph / special consonants — use real English words so the
  // engine pronounces the cluster correctly instead of spelling it out
  "/ʃ/": "shah",         // "sh" as in "shah"
  "/tʃ/": "cha",         // "ch" as in "cha-cha"
  "/θ/": "thaw",         // voiceless "th" as in "thaw"
  "/ŋ/": "sung",         // "ng" as in "sung"
  "/ts/": "tsar",        // "ts" as in "tsar"
  "/x/": "loch",         // voiceless velar fricative as in "loch"
  "/q/": "kah",          // uvular stop — closest English approximation
  "/χ/": "loch",         // uvular fricative — same carrier word
};

export function speakIpa(ipa: string): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  const text = ipaToUtterance[ipa] || ipa.replace(/\//g, "");

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.7;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
