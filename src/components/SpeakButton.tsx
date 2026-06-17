import { useEffect, useState } from "react";

type Props = {
  text: string;
  lang: "en-US" | "ro-RO";
  label?: string;
  size?: "sm" | "md";
};

let cachedVoices: SpeechSynthesisVoice[] | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }
    if (cachedVoices && cachedVoices.length) {
      resolve(cachedVoices);
      return;
    }
    const v = window.speechSynthesis.getVoices();
    if (v.length) {
      cachedVoices = v;
      resolve(v);
      return;
    }
    const onChange = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.removeEventListener("voiceschanged", onChange);
      resolve(cachedVoices ?? []);
    };
    window.speechSynthesis.addEventListener("voiceschanged", onChange);
    // safety timeout
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 800);
  });
}

function pickVoice(voices: SpeechSynthesisVoice[], lang: string) {
  const base = lang.split("-")[0];
  return (
    voices.find((v) => v.lang === lang) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(base)) ??
    null
  );
}

export function SpeakButton({ text, lang, label, size = "sm" }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  async function play(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!supported) return;
    try {
      window.speechSynthesis.cancel();
      const voices = await loadVoices();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      const voice = pickVoice(voices, lang);
      if (voice) utter.voice = voice;
      utter.rate = lang === "ro-RO" ? 0.92 : 0.95;
      utter.pitch = 1;
      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
    } catch {
      setSpeaking(false);
    }
  }

  if (!supported) return null;

  const dims = size === "sm" ? "h-6 w-6 text-[11px]" : "h-8 w-8 text-sm";

  return (
    <button
      type="button"
      onClick={play}
      aria-label={label ?? `Play ${lang === "ro-RO" ? "Romanian" : "English"} audio`}
      title={label ?? `Play ${lang === "ro-RO" ? "Romanian" : "English"} audio`}
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-full border transition-colors",
        dims,
        speaking
          ? "border-primary bg-primary/15 text-primary animate-pulse"
          : "border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-primary",
      ].join(" ")}
    >
      {speaking ? "🔊" : "▶"}
    </button>
  );
}
