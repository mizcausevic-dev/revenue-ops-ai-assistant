import { Router } from "express";
import { z } from "zod";
import { generateAssistantInsight } from "../services/ai.js";
import { getAccountBundle, getCampaignInsights, getPipelineSnapshot } from "../services/dataStore.js";
import { getRevenueSummary } from "../utils/metrics.js";

const router = Router();

const accountBriefSchema = z.object({
  accountId: z.string().min(1)
});

router.post("/account-brief", async (req, res, next) => {
  try {
    const { accountId } = accountBriefSchema.parse(req.body);
    const bundle = getAccountBundle(accountId);

    if (!bundle) {
      const error = new Error(`Account ${accountId} was not found.`) as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    const insight = await generateAssistantInsight({
      instructions:
        "Create an account brief for revenue operators. Highlight account fit, engagement, open opportunities, risk, and next best action. This is an account brief.",
      promptContext: bundle
    });

    return res.json(insight);
  } catch (error) {
    return next(error);
  }
});

router.post("/pipeline-summary", async (req, res, next) => {
  try {
    const insight = await generateAssistantInsight({
      instructions:
        "Create a pipeline summary for revenue operators. Explain stage concentration, pipeline risk, bottlenecks, and operational next steps. This is a pipeline summary.",
      promptContext: {
        ...getPipelineSnapshot(),
        revenueSummary: getRevenueSummary()
      }
    });

    return res.json(insight);
  } catch (error) {
    return next(error);
  }
});

router.post("/campaign-insights", async (req, res, next) => {
  try {
    const insight = await generateAssistantInsight({
      instructions:
        "Create campaign insights for revenue operators. Explain campaign quality, pipeline influence, likely optimization opportunities, and next-step recommendations.",
      promptContext: {
        campaigns: getCampaignInsights(),
        revenueSummary: getRevenueSummary()
      }
    });

    return res.json(insight);
  } catch (error) {
    return next(error);
  }
});

export default router;
