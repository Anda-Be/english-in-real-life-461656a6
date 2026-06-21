import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { text, voice, lang } = (await request.json()) as {
            text?: string;
            voice?: string;
            lang?: string;
          };
          if (!text || typeof text !== "string") {
            return new Response("Missing text", { status: 400 });
          }
          if (text.length > 600) {
            return new Response("Text too long", { status: 400 });
          }

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response("Server misconfigured", { status: 500 });
          }

          // Steer pronunciation via instructions for Romanian
          const instructions =
            lang === "ro" || lang === "ro-RO"
              ? "Speak as a native Romanian speaker. Use authentic Romanian pronunciation (ă, â, î, ș, ț), natural intonation and rhythm. Speak clearly and at a calm, learner-friendly pace."
              : "Speak clearly and naturally at a calm, learner-friendly pace.";

          const upstream = await fetch(
            "https://ai.gateway.lovable.dev/v1/audio/speech",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "openai/gpt-4o-mini-tts",
                input: text,
                voice: voice || "alloy",
                response_format: "mp3",
                instructions,
                speed: 0.95,
              }),
            },
          );

          if (!upstream.ok) {
            const detail = await upstream.text().catch(() => "");
            return new Response(detail || "TTS upstream error", {
              status: upstream.status,
            });
          }

          return new Response(upstream.body, {
            status: 200,
            headers: {
              "Content-Type": "audio/mpeg",
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        } catch (err) {
          console.error("tts error", err);
          return new Response("Internal error", { status: 500 });
        }
      },
    },
  },
});
