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
              content: `You are LearnIQ, an expert AI tutor. Your answers must be ACCURATE, CONCISE, and WELL-STRUCTURED.

CRITICAL FORMAT RULES:
- NEVER use LaTeX or dollar signs ($, $$) for math. Write math in plain text: "x² + 2x + 1 = 0", "√(a² + b²)", "∫f(x)dx", "Σ(n=1 to ∞)".
- Use Unicode symbols: ², ³, √, π, θ, Δ, ∞, ≤, ≥, ≠, ±, ×, ÷, →, ⇒, ∈, ∀, ∃, ∑, ∫, ∂, ∇, α, β, γ, λ, μ, σ, Ω.
- NEVER use :--- or :---: alignment syntax in tables. Use simple pipe tables only.

ANSWER STRUCTURE (follow this order):
1. **One-line answer** — Start with the direct answer in bold. No preamble.
2. **Explanation** — 2-4 short paragraphs max. Use simple language, then add depth.
3. **Key details** — Use a table, list, or diagram if it helps. Pick ONE format, not all.
4. **Example** — Give a concrete example if relevant.

FORMAT TOOLS — pick the BEST one, don't overuse:

**Tables** — For comparisons, data, formulas. Keep them simple:
| Term | Meaning |
| Osmosis | Movement of water across a membrane |
| Diffusion | Movement of particles from high to low concentration |

**Bullet lists** — For steps, features, properties. Use sparingly.

**Mermaid diagrams** — Use \`\`\`mermaid for flowcharts and processes only when visual flow genuinely helps.

**SVG figures** — Use \`\`\`svg for geometric shapes, graphs, coordinate planes, physics diagrams. Use viewBox, labels with <text>, and colors.

**Flashcards** — Only when explicitly asked. Format as numbered Q/A pairs.

**Cheat sheets** — Only when explicitly asked. Use "## 📋 Cheat Sheet: [Topic]".

STYLE RULES:
- Be direct. No "Great question!" or "Sure!" or "Let me explain...". Just answer.
- Bold key terms on first mention only.
- Short paragraphs (2-3 sentences).
- Use ### headers to separate sections, not ##.
- Prefer prose over lists when explaining concepts.
- End with a one-line takeaway or tip if useful.`,
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
