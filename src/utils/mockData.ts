import { ScorecardData } from '../types';

// Enhanced mock data based on real audit patterns
const AFFILIATE_NETWORKS = [
  'Amazon Associates', 'ShareASale', 'CJ Affiliate', 'ClickBank', 'Impact',
  'PartnerStack', 'Rakuten Advertising', 'FlexOffers', 'Awin', 'LinkShare'
];

const MERCHANT_CATEGORIES = [
  'E-commerce/Retail', 'Software/SaaS', 'Education/Courses', 'Health/Wellness',
  'Finance/Investment', 'Travel/Hospitality', 'Technology/Electronics', 'Books/Media'
];

const BROKEN_LINK_TYPES = [
  '404 Not Found', '403 Forbidden', '500 Server Error', 'Timeout', 
  'Connection Error', 'SSL Certificate Error', 'Redirect Loop'
];

const UNMONETIZED_OPPORTUNITIES = [
  'Amazon product mentions without affiliate links',
  'Software tool references with direct links',
  'Course recommendations without tracking',
  'Book citations linking to publisher sites',
  'Service provider mentions without referral codes',
  'Product comparisons with non-affiliate links',
  'Tutorial tool recommendations',
  'Resource page external links'
];

const ARBITRAGE_OPPORTUNITIES = [
  'Amazon links eligible for higher commission rates',
  'Direct merchant programs with better terms',
  'Premium network access opportunities',
  'Exclusive partnership programs',
  'Higher-tier affiliate status available',
  'Cross-network optimization potential'
];

// Simulate realistic link analysis based on traffic tier and URL characteristics
export const generateMockScorecard = (websiteUrl: string, trafficTier: string): ScorecardData => {
  // Use URL characteristics for variation
  const urlSeed = websiteUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variation = urlSeed % 10;
  
  let baseMetrics = {
    score: 'C+',
    totalLinks: 150,
    unmonetizedLinks: 45,
    brokenLinks: 25,
    betterProgramLinks: 12,
    brokenMonetized: 8,
    suspectedAffiliateLinks: 35,
    knownMerchantLinks: 28
  };

  // Adjust metrics based on traffic tier (mimicking real audit patterns)
  switch (trafficTier) {
    case '<10k':
      baseMetrics = {
        score: ['B-', 'C+', 'C'][variation % 3],
        totalLinks: 80 + (variation * 8),
        unmonetizedLinks: 25 + (variation * 3),
        brokenLinks: 12 + (variation * 2),
        betterProgramLinks: 6 + variation,
        brokenMonetized: 4 + Math.floor(variation / 2),
        suspectedAffiliateLinks: 15 + (variation * 2),
        knownMerchantLinks: 12 + variation
      };
      break;
    case '10k-50k':
      baseMetrics = {
        score: ['B', 'B-', 'C+'][variation % 3],
        totalLinks: 200 + (variation * 15),
        unmonetizedLinks: 65 + (variation * 5),
        brokenLinks: 35 + (variation * 3),
        betterProgramLinks: 15 + (variation * 2),
        brokenMonetized: 12 + variation,
        suspectedAffiliateLinks: 45 + (variation * 3),
        knownMerchantLinks: 38 + (variation * 2)
      };
      break;
    case '50k-250k':
      baseMetrics = {
        score: ['C+', 'C', 'B-'][variation % 3],
        totalLinks: 450 + (variation * 25),
        unmonetizedLinks: 125 + (variation * 8),
        brokenLinks: 75 + (variation * 5),
        betterProgramLinks: 28 + (variation * 3),
        brokenMonetized: 22 + (variation * 2),
        suspectedAffiliateLinks: 95 + (variation * 6),
        knownMerchantLinks: 85 + (variation * 4)
      };
      break;
    case '250k+':
      baseMetrics = {
        score: ['C', 'D+', 'C-'][variation % 3],
        totalLinks: 850 + (variation * 40),
        unmonetizedLinks: 280 + (variation * 15),
        brokenLinks: 165 + (variation * 10),
        betterProgramLinks: 55 + (variation * 5),
        brokenMonetized: 45 + (variation * 4),
        suspectedAffiliateLinks: 180 + (variation * 12),
        knownMerchantLinks: 150 + (variation * 8)
      };
      break;
  }

  // Calculate realistic revenue uplift based on audit patterns
  const avgClicksPerLink = 8;
  const avgOrderValue = 65;
  const avgCommissionRate = 0.06;
  const conversionRate = 0.025;
  
  // Unmonetized opportunity calculation
  const unmonetizedRevenue = baseMetrics.unmonetizedLinks * 
    avgClicksPerLink * avgOrderValue * avgCommissionRate * conversionRate;
  
  // Broken affiliate link recovery
  const brokenAffiliateRecovery = baseMetrics.brokenMonetized * 
    avgClicksPerLink * avgOrderValue * avgCommissionRate * conversionRate * 0.7;
  
  // Better program opportunities (commission rate improvements)
  const betterProgramUplift = baseMetrics.betterProgramLinks * 
    avgClicksPerLink * avgOrderValue * 0.035 * conversionRate; // 3.5% better rate
  
  const estimatedMonthlyUplift = Math.round(
    unmonetizedRevenue + brokenAffiliateRecovery + betterProgramUplift
  );

  return {
    score: baseMetrics.score,
    unmonetized_links: baseMetrics.unmonetizedLinks,
    broken_links: baseMetrics.brokenLinks,
    better_program_links: baseMetrics.betterProgramLinks,
    estimated_monthly_uplift: estimatedMonthlyUplift,
    broken_monetized: baseMetrics.brokenMonetized,
    // Additional detailed metrics for full audit
    total_links_analyzed: baseMetrics.totalLinks,
    suspected_affiliate_links: baseMetrics.suspectedAffiliateLinks,
    known_merchant_links: baseMetrics.knownMerchantLinks
  };
};

// Generate detailed audit findings for full report
export const generateDetailedFindings = (scorecardData: ScorecardData, websiteUrl: string) => {
  const urlSeed = websiteUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate realistic unmonetized opportunities
  const unmonetizedFindings = UNMONETIZED_OPPORTUNITIES
    .slice(0, Math.min(6, Math.ceil(scorecardData.unmonetized_links / 20)))
    .map((opportunity, index) => ({
      category: opportunity,
      count: Math.floor(scorecardData.unmonetized_links / 6) + ((urlSeed + index) % 8),
      estimatedMonthlyValue: Math.round((scorecardData.estimated_monthly_uplift * 0.4) / 6) + ((urlSeed + index) % 50)
    }));

  // Generate broken link analysis
  const brokenLinkFindings = BROKEN_LINK_TYPES
    .slice(0, 4)
    .map((type, index) => ({
      type,
      count: Math.floor(scorecardData.broken_links / 4) + ((urlSeed + index) % 5),
      potentialLostRevenue: Math.round((scorecardData.estimated_monthly_uplift * 0.25) / 4) + ((urlSeed + index) % 30)
    }));

  // Generate arbitrage opportunities
  const arbitrageFindings = ARBITRAGE_OPPORTUNITIES
    .slice(0, Math.min(4, Math.ceil(scorecardData.better_program_links / 10)))
    .map((opportunity, index) => ({
      category: opportunity,
      count: Math.floor(scorecardData.better_program_links / 4) + ((urlSeed + index) % 3),
      currentRate: `${2 + (index * 2)}%`,
      potentialRate: `${8 + (index * 4)}%`,
      estimatedUplift: Math.round((scorecardData.estimated_monthly_uplift * 0.35) / 4) + ((urlSeed + index) % 40)
    }));

  // Generate network analysis
  const networkAnalysis = AFFILIATE_NETWORKS
    .slice(0, 5)
    .map((network, index) => ({
      network,
      currentLinks: Math.floor(scorecardData.suspected_affiliate_links / 5) + ((urlSeed + index) % 8),
      opportunities: Math.floor(scorecardData.unmonetized_links / 8) + ((urlSeed + index) % 12),
      avgCommissionRate: `${3 + (index * 2)}%`
    }));

  // Generate merchant category breakdown
  const merchantAnalysis = MERCHANT_CATEGORIES
    .slice(0, 6)
    .map((category, index) => ({
      category,
      unmonetizedCount: Math.floor(scorecardData.unmonetized_links / 8) + ((urlSeed + index) % 15),
      brokenCount: Math.floor(scorecardData.broken_links / 8) + ((urlSeed + index) % 8),
      opportunityValue: Math.round(scorecardData.estimated_monthly_uplift / 8) + ((urlSeed + index) % 100)
    }));

  return {
    unmonetizedFindings,
    brokenLinkFindings,
    arbitrageFindings,
    networkAnalysis,
    merchantAnalysis,
    // Summary statistics
    totalPagesAnalyzed: Math.floor(scorecardData.total_links_analyzed / 15) + 25,
    avgLinksPerPage: Math.round(scorecardData.total_links_analyzed / (Math.floor(scorecardData.total_links_analyzed / 15) + 25)),
    topPerformingCategories: merchantAnalysis.slice(0, 3).map(m => m.category),
    priorityNetworks: networkAnalysis.slice(0, 3).map(n => n.network)
  };
};

// Generate realistic implementation timeline
export const generateImplementationPlan = (scorecardData: ScorecardData) => {
  const phases = [
    {
      phase: 'Quick Wins (Week 1-2)',
      tasks: [
        'Fix broken affiliate links',
        'Add affiliate tracking to top unmonetized links',
        'Update expired promotional codes'
      ],
      estimatedUplift: Math.round(scorecardData.estimated_monthly_uplift * 0.3),
      effort: 'Low'
    },
    {
      phase: 'Network Optimization (Week 3-4)',
      tasks: [
        'Apply to higher-commission affiliate programs',
        'Negotiate better rates with existing partners',
        'Implement cross-network optimization'
      ],
      estimatedUplift: Math.round(scorecardData.estimated_monthly_uplift * 0.4),
      effort: 'Medium'
    },
    {
      phase: 'Content Enhancement (Week 5-8)',
      tasks: [
        'Add affiliate links to historical content',
        'Create comparison tables with affiliate links',
        'Optimize anchor text and placement'
      ],
      estimatedUplift: Math.round(scorecardData.estimated_monthly_uplift * 0.3),
      effort: 'High'
    }
  ];

  return phases;
};