import { accounts, activities, campaigns, contacts, opportunities, revenueSnapshots } from "../data.js";

export function listAccounts() {
  return accounts;
}

export function getAccountById(id: string) {
  return accounts.find((account) => account.id === id);
}

export function listCampaigns() {
  return campaigns;
}

export function listActivities() {
  return activities;
}

export function listOpportunities() {
  return opportunities;
}

export function getAccountBundle(accountId: string) {
  const account = getAccountById(accountId);

  if (!account) {
    return null;
  }

  return {
    account,
    contacts: contacts.filter((contact) => contact.accountId === accountId),
    opportunities: opportunities.filter((opportunity) => opportunity.accountId === accountId),
    activities: activities.filter((activity) => activity.accountId === accountId),
    revenueSnapshots: revenueSnapshots.filter((snapshot) => snapshot.accountId === accountId)
  };
}

export function getPipelineSnapshot() {
  const pipelineByStage = opportunities.reduce<Record<string, { deals: number; amount: number }>>(
    (acc, opportunity) => {
      acc[opportunity.stage] ??= { deals: 0, amount: 0 };
      acc[opportunity.stage].deals += 1;
      acc[opportunity.stage].amount += opportunity.amount;
      return acc;
    },
    {}
  );

  return {
    opportunities,
    pipelineByStage
  };
}

export function getCampaignInsights() {
  return campaigns.map((campaign) => {
    const campaignActivities = activities.filter((activity) => activity.campaignId === campaign.id);
    return {
      ...campaign,
      engagementEvents: campaignActivities.length,
      totalEngagementScore: campaignActivities.reduce((sum, item) => sum + item.score, 0)
    };
  });
}
