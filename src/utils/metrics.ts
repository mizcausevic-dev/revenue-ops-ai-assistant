import { accounts, activities, campaigns, opportunities, revenueSnapshots } from "../data.js";

export function getRevenueSummary() {
  const totalArr = revenueSnapshots.reduce((sum, item) => sum + item.arr, 0);
  const weightedPipeline = opportunities.reduce(
    (sum, item) => sum + item.amount * (item.probability / 100),
    0
  );
  const avgHealthScore =
    Math.round(accounts.reduce((sum, item) => sum + item.healthScore, 0) / accounts.length) || 0;
  const avgRenewalRisk =
    Math.round(accounts.reduce((sum, item) => sum + item.renewalRisk, 0) / accounts.length) || 0;
  const avgCampaignLeadQuality =
    Math.round(
      campaigns.reduce((sum, item) => sum + item.leadQualityScore, 0) / campaigns.length
    ) || 0;
  const activityScore = activities.reduce((sum, item) => sum + item.score, 0);

  return {
    totalArr,
    weightedPipeline: Math.round(weightedPipeline),
    avgHealthScore,
    avgRenewalRisk,
    avgCampaignLeadQuality,
    recentActivityScore: activityScore,
    openOpportunities: opportunities.filter(
      (item) => item.stage !== "closed_won" && item.stage !== "closed_lost"
    ).length
  };
}
