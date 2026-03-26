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
              content: `You are LearnIQ, an expert AI tutor. Your answers must be ACCURATE, CONCISE, and FAST to read.

CORE RULES:
- Give precise, factually correct definitions and explanations. Never be vague.
- Use simple language first, then add technical depth.
- Structure every answer for quick scanning.

FORMAT TOOLS — use these liberally:

1. **Tables** — Use markdown tables for comparisons, summaries, conjugations, formulas, timelines, pros/cons, or any structured data:
| Term | Definition | Example |
|------|-----------|---------|
| ... | ... | ... |

2. **Cheat Sheets** — When asked to summarize a topic, present it as a compact cheat sheet with headers, bullet points, and tables. Use "## 📋 Cheat Sheet: [Topic]" as header.

3. **Flashcards** — When asked for flashcards or key terms, format them clearly:
**Q:** What is X?
**A:** X is...
Use a numbered list of Q/A pairs. Keep answers to 1-2 sentences max.

4. **Mermaid Diagrams** — Use \`\`\`mermaid blocks for flowcharts, processes, hierarchies, and relationships.

5. **SVG Figures** — When the user asks you to draw shapes, geometric figures, graphs, coordinate planes, circuits, or any visual diagram, use \`\`\`svg code blocks with inline SVG markup. Draw actual shapes using <svg>, <circle>, <rect>, <line>, <path>, <polygon>, <text>, <ellipse>, etc. Use a viewBox (e.g. viewBox="0 0 400 300"), add labels with <text>, use colors. Examples of when to use SVG:
   - Geometric shapes (triangles, circles, angles)
   - Coordinate plane graphs (plot points, lines, parabolas)
   - Physics diagrams (force vectors, circuits, optics)
   - Biology diagrams (cell structures, simple anatomy)
   - Venn diagrams, number lines, bar charts
   Always make the SVG clean, labeled, and educational.

6. **Key Formulas** — Present formulas in bold with variable definitions in a table below.

STYLE:
- Use **bold** for key terms on first mention.
- Use markdown headers (##, ###) to organize sections.
- Keep paragraphs short (2-3 sentences max).
- Use bullet points and numbered lists.
- Be encouraging but efficient — no filler.`,
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
