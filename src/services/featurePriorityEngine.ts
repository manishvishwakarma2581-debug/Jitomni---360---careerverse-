import { FeaturePriorityItem } from '../types';

const FEATURES_STORAGE_KEY = 'jitomni_feature_priority_pipeline';

export const INITIAL_FEATURE_PIPELINE: FeaturePriorityItem[] = [
  {
    id: 'feat_playstore_twa',
    title: 'Google Play Store TWA Packaging & Push Notifications',
    description: 'Transforming PWA into a native Android app via Trusted Web Activity with Firebase Cloud Messaging push notifications for vacancy and job alerts.',
    targetModule: 'home',
    nationalImpactScore: 9,
    revenuePotentialScore: 9,
    technicalFeasibilityScore: 10,
    userDemandScore: 10,
    compositePriorityScore: 9.35,
    status: 'active',
    category: 'security_infrastructure',
    targetReleasePhase: 'Sprint 1 (Immediate)',
  },
  {
    id: 'feat_whatsapp_kisan_bot',
    title: 'WhatsApp & IVR Voice Assistant for Farmers and Labour',
    description: 'Allowing 10th pass workers and rural farmers to interact with Krishi 360° and Labour jobs via voice notes on WhatsApp without reading.',
    targetModule: 'agri',
    nationalImpactScore: 10,
    revenuePotentialScore: 8,
    technicalFeasibilityScore: 8,
    userDemandScore: 10,
    compositePriorityScore: 9.1,
    status: 'active',
    category: 'core_nation_building',
    targetReleasePhase: 'Sprint 1 (Immediate)',
  },
  {
    id: 'feat_digilocker_aadhaar',
    title: 'DigiLocker & 10th/12th Marksheet Instant Verification API',
    description: 'Direct government credential verification bridge to eradicate fake degrees and fake work experience completely.',
    targetModule: 'verifiedjobs',
    nationalImpactScore: 10,
    revenuePotentialScore: 9,
    technicalFeasibilityScore: 7,
    userDemandScore: 9,
    compositePriorityScore: 8.95,
    status: 'next_sprint',
    category: 'core_nation_building',
    targetReleasePhase: 'Sprint 2 (Week 2)',
  },
  {
    id: 'feat_upi_split_escrow',
    title: 'Automated 90/10 & 80/20 Instant UPI Payout to Worker Wallets',
    description: 'Direct bank payout integration so companion drivers and labour get money credited to their bank accounts immediately upon task completion.',
    targetModule: 'companion',
    nationalImpactScore: 9,
    revenuePotentialScore: 9,
    technicalFeasibilityScore: 8,
    userDemandScore: 9,
    compositePriorityScore: 8.85,
    status: 'next_sprint',
    category: 'revenue_engine',
    targetReleasePhase: 'Sprint 2 (Week 2)',
  },
  {
    id: 'feat_offline_mock_sync',
    title: 'Offline CBT Examination Sync for Rural Exam Centers',
    description: 'Pre-caching full UPSC/SSC test papers so candidates in low-connectivity areas can attempt tests and sync scores when online.',
    targetModule: 'exam',
    nationalImpactScore: 8,
    revenuePotentialScore: 7,
    technicalFeasibilityScore: 9,
    userDemandScore: 8,
    compositePriorityScore: 7.85,
    status: 'backlog',
    category: 'ai_deeptech',
    targetReleasePhase: 'Sprint 3 (Month 1)',
  },
];

export class FeaturePriorityEngine {
  static getFeatures(): FeaturePriorityItem[] {
    const raw = localStorage.getItem(FEATURES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(FEATURES_STORAGE_KEY, JSON.stringify(INITIAL_FEATURE_PIPELINE));
      return INITIAL_FEATURE_PIPELINE;
    }
    try {
      const items: FeaturePriorityItem[] = JSON.parse(raw);
      // Sort descending by composite priority score
      return items.sort((a, b) => b.compositePriorityScore - a.compositePriorityScore);
    } catch {
      return INITIAL_FEATURE_PIPELINE;
    }
  }

  static addOrUpdateFeature(
    item: Omit<FeaturePriorityItem, 'id' | 'compositePriorityScore'>,
    existingId?: string
  ): FeaturePriorityItem {
    // Weighted scoring formula:
    // National Impact = 40%
    // Revenue Potential = 30%
    // Technical Feasibility = 15%
    // User Demand = 15%
    const compositePriorityScore = Number(
      (
        item.nationalImpactScore * 0.4 +
        item.revenuePotentialScore * 0.3 +
        item.technicalFeasibilityScore * 0.15 +
        item.userDemandScore * 0.15
      ).toFixed(2)
    );

    const newItem: FeaturePriorityItem = {
      ...item,
      id: existingId || `feat_${Date.now()}`,
      compositePriorityScore,
    };

    const current = this.getFeatures();
    const existingIndex = current.findIndex((f) => f.id === newItem.id);
    if (existingIndex >= 0) {
      current[existingIndex] = newItem;
    } else {
      current.push(newItem);
    }

    current.sort((a, b) => b.compositePriorityScore - a.compositePriorityScore);
    localStorage.setItem(FEATURES_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('jitomni-features-updated', { detail: current }));
    return newItem;
  }

  static updateFeatureStatus(id: string, status: FeaturePriorityItem['status']): void {
    const current = this.getFeatures();
    const target = current.find((f) => f.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(FEATURES_STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent('jitomni-features-updated', { detail: current }));
    }
  }
}
