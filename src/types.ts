export type AccountRecord = {
  id: string;
  name: string;
  industry: string;
  segment: "enterprise" | "mid_market" | "growth";
  region: string;
  employeeCount: number;
  annualRevenue: number;
  website: string;
  fitScore: number;
  intentScore: number;
  healthScore: number;
  renewalRisk: number;
};

export type ContactRecord = {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  roleArea: string;
  engagementScore: number;
};

export type CampaignRecord = {
  id: string;
  name: string;
  channel: string;
  budget: number;
  influencedPipeline: number;
  attributedRevenue: number;
  leadsGenerated: number;
  leadQualityScore: number;
  startDate: string;
  endDate: string;
};

export type OpportunityRecord = {
  id: string;
  accountId: string;
  name: string;
  stage: string;
  amount: number;
  probability: number;
  expectedCloseDate: string;
  owner: string;
  source: string;
  riskLevel: string;
};

export type ActivityRecord = {
  id: string;
  accountId: string;
  campaignId: string | null;
  type: string;
  channel: string;
  score: number;
  happenedAt: string;
  description: string;
};

export type RevenueSnapshotRecord = {
  id: string;
  accountId: string;
  snapshotMonth: string;
  arr: number;
  pipelineCoverage: number;
  expansionPotential: number;
  churnRisk: number;
};
