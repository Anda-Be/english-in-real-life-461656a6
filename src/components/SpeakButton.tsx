import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  lang: "en-US" | "ro-RO";
  label?: string;
  size?: "sm" | "md";
};

// Per-session in-memory cache: text+lang -> object URL of mp3 blob.
const audioCache = new Map<string, string>();

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

async function speakViaBrowser(text: string, lang: string) {
  window.speechSynthesis.cancel();
  const voices = await loadVoices();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  const voice = pickVoice(voices, lang);
  if (voice) utter.voice = voice;
  utter.rate = 0.95;
  return new Promise<void>((resolve) => {
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    window.speechSynthesis.speak(utter);
  });
}

export function SpeakButton({ text, lang, label, size = "sm" }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [supported, setSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" &&
        ("speechSynthesis" in window || typeof Audio !== "undefined"),
    );
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  async function fetchRomanianAudio(t: string): Promise<string> {
    const key = `ro-RO::${t}`;
    const cached = audioCache.get(key);
    if (cached) return cached;
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: t, lang: "ro" }),
    });
    if (!res.ok) throw new Error(`TTS ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioCache.set(key, url);
    return url;
  }

  async function play(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!supported || loading || speaking) return;

    try {
      if (lang === "ro-RO") {
        setLoading(true);
        const url = await fetchRomanianAudio(text);
        setLoading(false);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onplay = () => setSpeaking(true);
        audio.onended = () => setSpeaking(false);
        audio.onerror = () => setSpeaking(false);
        await audio.play();
      } else {
        if (!("speechSynthesis" in window)) return;
        setSpeaking(true);
        await speakViaBrowser(text, lang);
        setSpeaking(false);
      }
    } catch (err) {
      console.error("Speak failed", err);
      setLoading(false);
      setSpeaking(false);
      // Fallback for Romanian: try browser TTS
      if (lang === "ro-RO" && "speechSynthesis" in window) {
        try {
          setSpeaking(true);
          await speakViaBrowser(text, lang);
        } finally {
          setSpeaking(false);
        }
      }
    }
  }

  if (!supported) return null;

  const dims = size === "sm" ? "h-6 w-6 text-[11px]" : "h-8 w-8 text-sm";
  const active = speaking || loading;

  return (
    <button
      type="button"
      onClick={play}
      disabled={loading}
      aria-label={label ?? `Play ${lang === "ro-RO" ? "Romanian" : "English"} audio`}
      title={label ?? `Play ${lang === "ro-RO" ? "Romanian" : "English"} audio`}
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-full border transition-colors",
        dims,
        active
          ? "border-primary bg-primary/15 text-primary animate-pulse"
          : "border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-primary",
      ].join(" ")}
    >
      {loading ? "…" : speaking ? "🔊" : "▶"}
    </button>
  );
}
