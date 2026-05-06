import OpenAI from "openai";
import { z } from "zod";

const assistantRequestSchema = z.object({
  promptContext: z.record(z.any()),
  instructions: z.string().min(1)
});

function buildFallbackSummary(instructions: string, promptContext: Record<string, unknown>) {
  if (instructions.includes("account brief")) {
    return {
      mode: "fallback",
      summary:
        "High-fit account with meaningful engagement and active pipeline. Recommend executive follow-up tied to revenue visibility and forecast confidence.",
      recommendations: [
        "Route this account to a senior AE or RevOps specialist within 24 hours.",
        "Anchor outreach in pipeline visibility, board reporting, and forecast accuracy outcomes.",
        "Use recent engagement events and open opportunity context in the follow-up."
      ],
      sourceMetrics: promptContext
    };
  }

  if (instructions.includes("pipeline summary")) {
    return {
      mode: "fallback",
      summary:
        "Pipeline is healthy overall, but value is concentrated in mid-to-late stages. Focus on risk removal for evaluation and proposal-stage deals.",
      recommendations: [
        "Review qualification-to-evaluation conversion friction.",
        "Escalate stalled proposal deals with executive alignment and ROI messaging.",
        "Triage lower-probability opportunities for pipeline hygiene."
      ],
      sourceMetrics: promptContext
    };
  }

  return {
    mode: "fallback",
    summary:
      "Campaign mix is generating pipeline, but quality varies. Prioritize channels with stronger downstream commercial signals over pure volume.",
    recommendations: [
      "Shift spend toward channels with stronger influenced pipeline and lead quality.",
      "Review nurture paths for lower-quality campaign cohorts.",
      "Align content follow-up to stage-specific operator needs."
    ],
    sourceMetrics: promptContext
  };
}

export async function generateAssistantInsight(input: unknown) {
  const { promptContext, instructions } = assistantRequestSchema.parse(input);

  if (!process.env.OPENAI_API_KEY) {
    return buildFallbackSummary(instructions, promptContext);
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const completion = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "You are a revenue operations analyst. Provide concise, operator-ready summaries grounded only in the supplied metrics. Return JSON with keys: summary, recommendations."
      },
      {
        role: "user",
        content: JSON.stringify({
          instructions,
          metrics: promptContext
        })
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "revenue_ops_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            recommendations: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["summary", "recommendations"],
          additionalProperties: false
        }
      }
    }
  });

  const parsedText = completion.output_text;
  const parsed = JSON.parse(parsedText) as {
    summary: string;
    recommendations: string[];
  };

  return {
    mode: "openai",
    ...parsed,
    sourceMetrics: promptContext
  };
}
