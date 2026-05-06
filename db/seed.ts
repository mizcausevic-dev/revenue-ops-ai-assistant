import { PrismaClient, AccountSegment, OpportunityStage } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.activity.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.opportunity.deleteMany();
  await prisma.revenueSnapshot.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.account.deleteMany();

  await prisma.account.createMany({
    data: [
      {
        id: "acct-001",
        name: "Northbeam Cloud",
        industry: "Cloud Infrastructure",
        segment: AccountSegment.enterprise,
        region: "North America",
        employeeCount: 2200,
        annualRevenue: 480000000,
        website: "https://northbeamcloud.example",
        fitScore: 93,
        intentScore: 88,
        healthScore: 81,
        renewalRisk: 22
      },
      {
        id: "acct-002",
        name: "Sentinel Ledger",
        industry: "Cybersecurity",
        segment: AccountSegment.mid_market,
        region: "EMEA",
        employeeCount: 720,
        annualRevenue: 118000000,
        website: "https://sentinelledger.example",
        fitScore: 86,
        intentScore: 76,
        healthScore: 74,
        renewalRisk: 31
      },
      {
        id: "acct-003",
        name: "Atlas Metrics",
        industry: "Analytics",
        segment: AccountSegment.growth,
        region: "North America",
        employeeCount: 310,
        annualRevenue: 42000000,
        website: "https://atlasmetrics.example",
        fitScore: 78,
        intentScore: 69,
        healthScore: 83,
        renewalRisk: 18
      },
      {
        id: "acct-004",
        name: "Helio Commerce",
        industry: "Retail Technology",
        segment: AccountSegment.mid_market,
        region: "APAC",
        employeeCount: 980,
        annualRevenue: 162000000,
        website: "https://heliocommerce.example",
        fitScore: 71,
        intentScore: 63,
        healthScore: 68,
        renewalRisk: 42
      }
    ]
  });

  await prisma.contact.createMany({
    data: [
      {
        id: "con-001",
        accountId: "acct-001",
        firstName: "Maya",
        lastName: "Singh",
        title: "VP Revenue Operations",
        email: "maya.singh@northbeamcloud.example",
        roleArea: "Revenue Operations",
        engagementScore: 92
      },
      {
        id: "con-002",
        accountId: "acct-001",
        firstName: "Andre",
        lastName: "Lopez",
        title: "Director of Digital Platforms",
        email: "andre.lopez@northbeamcloud.example",
        roleArea: "Platform",
        engagementScore: 84
      },
      {
        id: "con-003",
        accountId: "acct-002",
        firstName: "Elena",
        lastName: "Kovacs",
        title: "Head of Demand Generation",
        email: "elena.kovacs@sentinelledger.example",
        roleArea: "Demand Generation",
        engagementScore: 74
      },
      {
        id: "con-004",
        accountId: "acct-003",
        firstName: "Jordan",
        lastName: "Price",
        title: "Chief Growth Officer",
        email: "jordan.price@atlasmetrics.example",
        roleArea: "Growth",
        engagementScore: 81
      },
      {
        id: "con-005",
        accountId: "acct-004",
        firstName: "Nina",
        lastName: "Tan",
        title: "Senior Lifecycle Manager",
        email: "nina.tan@heliocommerce.example",
        roleArea: "Lifecycle",
        engagementScore: 67
      }
    ]
  });

  await prisma.campaign.createMany({
    data: [
      {
        id: "camp-001",
        name: "Boardroom Revenue Intelligence Roundtable",
        channel: "Event",
        budget: 54000,
        influencedPipeline: 680000,
        attributedRevenue: 240000,
        leadsGenerated: 92,
        leadQualityScore: 88,
        startDate: new Date("2026-03-05"),
        endDate: new Date("2026-03-18")
      },
      {
        id: "camp-002",
        name: "Pipeline Forecast Automation Webinar",
        channel: "Webinar",
        budget: 26000,
        influencedPipeline: 410000,
        attributedRevenue: 162000,
        leadsGenerated: 121,
        leadQualityScore: 81,
        startDate: new Date("2026-02-11"),
        endDate: new Date("2026-02-25")
      },
      {
        id: "camp-003",
        name: "Enterprise RevOps Benchmark Report",
        channel: "Content Syndication",
        budget: 18000,
        influencedPipeline: 290000,
        attributedRevenue: 119000,
        leadsGenerated: 158,
        leadQualityScore: 72,
        startDate: new Date("2026-01-20"),
        endDate: new Date("2026-02-08")
      }
    ]
  });

  await prisma.opportunity.createMany({
    data: [
      {
        id: "opp-001",
        accountId: "acct-001",
        name: "Northbeam Global RevOps Visibility",
        stage: OpportunityStage.proposal,
        amount: 320000,
        probability: 72,
        expectedCloseDate: new Date("2026-06-20"),
        owner: "Riley Chen",
        source: "Boardroom Revenue Intelligence Roundtable",
        riskLevel: "medium"
      },
      {
        id: "opp-002",
        accountId: "acct-002",
        name: "Sentinel Forecast Accuracy Program",
        stage: OpportunityStage.evaluation,
        amount: 185000,
        probability: 54,
        expectedCloseDate: new Date("2026-07-10"),
        owner: "Ava Martinez",
        source: "Pipeline Forecast Automation Webinar",
        riskLevel: "medium"
      },
      {
        id: "opp-003",
        accountId: "acct-003",
        name: "Atlas Growth Intelligence Workspace",
        stage: OpportunityStage.negotiation,
        amount: 124000,
        probability: 83,
        expectedCloseDate: new Date("2026-05-28"),
        owner: "Dylan Scott",
        source: "Enterprise RevOps Benchmark Report",
        riskLevel: "low"
      },
      {
        id: "opp-004",
        accountId: "acct-004",
        name: "Helio Lifecycle Performance Overhaul",
        stage: OpportunityStage.qualification,
        amount: 97000,
        probability: 38,
        expectedCloseDate: new Date("2026-08-04"),
        owner: "Priya Shah",
        source: "Pipeline Forecast Automation Webinar",
        riskLevel: "high"
      }
    ]
  });

  await prisma.activity.createMany({
    data: [
      {
        id: "act-001",
        accountId: "acct-001",
        campaignId: "camp-001",
        type: "executive-roundtable",
        channel: "Event",
        score: 19,
        happenedAt: new Date("2026-03-10T15:30:00Z"),
        description: "VP RevOps attended executive roundtable and requested follow-up deck."
      },
      {
        id: "act-002",
        accountId: "acct-001",
        campaignId: "camp-002",
        type: "pricing-page",
        channel: "Website",
        score: 12,
        happenedAt: new Date("2026-03-14T19:05:00Z"),
        description: "Returned to pricing page twice within 24 hours."
      },
      {
        id: "act-003",
        accountId: "acct-002",
        campaignId: "camp-002",
        type: "webinar-attended",
        channel: "Webinar",
        score: 9,
        happenedAt: new Date("2026-02-22T16:00:00Z"),
        description: "Attended full forecast automation webinar."
      },
      {
        id: "act-004",
        accountId: "acct-003",
        campaignId: "camp-003",
        type: "benchmark-report-download",
        channel: "Content",
        score: 8,
        happenedAt: new Date("2026-02-06T13:40:00Z"),
        description: "Downloaded benchmark report and shared with growth leadership."
      },
      {
        id: "act-005",
        accountId: "acct-003",
        campaignId: null,
        type: "demo-request",
        channel: "Website",
        score: 18,
        happenedAt: new Date("2026-04-02T12:10:00Z"),
        description: "Requested tailored demo for board reporting workflow."
      },
      {
        id: "act-006",
        accountId: "acct-004",
        campaignId: "camp-002",
        type: "email-click",
        channel: "Email",
        score: 4,
        happenedAt: new Date("2026-03-12T09:55:00Z"),
        description: "Clicked nurture email and reviewed customer story."
      }
    ]
  });

  await prisma.revenueSnapshot.createMany({
    data: [
      {
        id: "rev-001",
        accountId: "acct-001",
        snapshotMonth: new Date("2026-04-01"),
        arr: 520000,
        pipelineCoverage: 3.1,
        expansionPotential: 180000,
        churnRisk: 18
      },
      {
        id: "rev-002",
        accountId: "acct-002",
        snapshotMonth: new Date("2026-04-01"),
        arr: 310000,
        pipelineCoverage: 2.2,
        expansionPotential: 74000,
        churnRisk: 28
      },
      {
        id: "rev-003",
        accountId: "acct-003",
        snapshotMonth: new Date("2026-04-01"),
        arr: 174000,
        pipelineCoverage: 4.0,
        expansionPotential: 92000,
        churnRisk: 14
      },
      {
        id: "rev-004",
        accountId: "acct-004",
        snapshotMonth: new Date("2026-04-01"),
        arr: 265000,
        pipelineCoverage: 1.6,
        expansionPotential: 61000,
        churnRisk: 39
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
