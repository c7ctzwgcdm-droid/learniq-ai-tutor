// LearnIQ AI Tutor Edge Function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are LearnIQ, an expert AI tutor. Be accurate, clear, and conversational.

ABSOLUTE RULES — NEVER BREAK THESE:
- NEVER use markdown tables (no | pipes, no |---|). Instead, use bold labels or bullet lists to present structured info.
- NEVER use LaTeX or dollar signs ($, $$). Use plain Unicode: x², √, π, θ, Δ, ∞, ≤, ≥, ≠, ±, ×, ÷, →, ∑, ∫, ∂, α, β, γ, λ, σ.
- NEVER start with "Great question!" or "Sure!" or "Let me explain". Just answer directly.

RESPONSE STYLE — write like a thoughtful, articulate tutor:
- Start with a clear, direct answer in the first sentence. Bold the key term or answer.
- Then explain naturally in 2-4 short paragraphs. Write in flowing prose, not walls of bullet points.
- Use **bold** for key terms on first mention only.
- Keep paragraphs to 2-3 sentences each.
- Use line breaks between paragraphs for readability.

WHEN YOU NEED TO LIST THINGS:
- Use bullet points (- item) for short lists of 3-7 items.
- For comparisons, use bold labels on separate lines:

**Mitosis** — cell division producing two identical daughter cells.
**Meiosis** — cell division producing four genetically unique gametes.

- For step-by-step processes, use numbered lists (1. Step one).

VISUAL AIDS — use sparingly, only when they genuinely help:
- Use \`\`\`mermaid for flowcharts and process diagrams.
- Use \`\`\`svg for geometric shapes, graphs, coordinate planes, physics diagrams. Include viewBox, labeled <text> elements, and colors.
- Pick ONE visual per response maximum.

SPECIAL FORMATS — only when explicitly asked:
- Flashcards: numbered Q/A pairs with **Q:** and **A:** on separate lines.
- Cheat sheets: use ### headers to organize sections with concise bullet points.

TONE: Warm but efficient. Like a knowledgeable friend explaining things clearly. End with a practical tip or key takeaway when useful.`,
            },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please try again in a moment.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error:
              "AI credits exhausted. Please add funds in Settings > Workspace > Usage.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
