"use client";

/**
 * IPA sound pronunciation using Web Speech API.
 * Maps IPA symbols to pronounceable approximations.
 */

// Map IPA to a simple pronounceable syllable for speech synthesis
const ipaToUtterance: Record<string, string> = {
  "/a/": "ah",
  "/e/": "eh",
  "/i/": "ee",
  "/o/": "oh",
  "/u/": "oo",
  "/b/": "buh",
  "/g/": "guh",
  "/d/": "duh",
  "/k/": "kuh",
  "/l/": "luh",
  "/m/": "muh",
  "/n/": "nuh",
  "/p/": "puh",
  "/r/": "ruh",
  "/s/": "sss",
  "/t/": "tuh",
  "/f/": "fff",
  "/h/": "huh",
  "/v/": "vvv",
  "/w/": "wuh",
  "/j/": "yuh",
  "/z/": "zzz",
  "/ʃ/": "shh",
  "/tʃ/": "chuh",
  "/θ/": "thh",
  "/ŋ/": "nng",
  "/ts/": "tsuh",
  "/x/": "khh",
  "/q/": "quh",
  "/χ/": "khh",
};

export function speakIpa(ipa: string): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  const text = ipaToUtterance[ipa] || ipa.replace(/\//g, "");

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.7;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
