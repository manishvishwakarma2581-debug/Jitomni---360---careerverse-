import { UserMemoryEntry } from '../types';
import { AuthService } from './authService';

const MEMORIES_STORAGE_KEY = 'jitomni_user_memories';

export class UserMemoryService {
  static getMemories(userId?: string): UserMemoryEntry[] {
    const targetUserId = userId || AuthService.getCurrentUser().id;
    const raw = localStorage.getItem(MEMORIES_STORAGE_KEY);
    if (!raw) {
      // Seed with initial memories demonstrating persistent context
      const defaultMemories: UserMemoryEntry[] = [
        {
          id: 'mem_1',
          userId: 'super_admin_manish',
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          category: 'career_target',
          topicOrSubject: 'Sovereign Nation Building & UPSC Philosophy',
          summary: 'Manish is dedicated to eliminating fake profiles and building economic self-reliance for Indian youth.',
          importance: 'critical',
        },
        {
          id: 'mem_2',
          userId: 'super_admin_manish',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          category: 'weak_topic',
          topicOrSubject: 'Constitutional Law - Article 32 vs Article 226',
          summary: 'Reviewed differences between Supreme Court and High Court writ jurisdictions. Scored 85% in mock test.',
          scoreOrDetail: '85% in Mock Test',
          importance: 'high',
        },
        {
          id: 'mem_3',
          userId: 'krishi_admin_mahi',
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          category: 'career_target',
          topicOrSubject: 'Modern Drone Spraying & ICAR Agronomy',
          summary: 'Mahi is optimizing drone NDVI sensors and soil NPK sensors for MP and Maharashtra crop clusters.',
          importance: 'critical',
        },
      ];
      localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(defaultMemories));
      return defaultMemories.filter((m) => m.userId === targetUserId);
    }

    try {
      const all: UserMemoryEntry[] = JSON.parse(raw);
      return all.filter((m) => m.userId === targetUserId);
    } catch {
      return [];
    }
  }

  static addMemory(entry: Omit<UserMemoryEntry, 'id' | 'timestamp' | 'userId'>, userId?: string): UserMemoryEntry {
    const targetUserId = userId || AuthService.getCurrentUser().id;
    const raw = localStorage.getItem(MEMORIES_STORAGE_KEY);
    let all: UserMemoryEntry[] = [];
    if (raw) {
      try {
        all = JSON.parse(raw);
      } catch {
        all = [];
      }
    }

    const newEntry: UserMemoryEntry = {
      ...entry,
      id: `mem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: targetUserId,
      timestamp: new Date().toISOString(),
    };

    all.unshift(newEntry);
    // Keep max 100 recent memories per user to preserve storage performance
    localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(all.slice(0, 500)));
    return newEntry;
  }

  static getWeakTopics(userId?: string): string[] {
    const memories = this.getMemories(userId);
    const weakEntries = memories.filter((m) => m.category === 'weak_topic');
    return Array.from(new Set(weakEntries.map((m) => m.topicOrSubject)));
  }

  static getAIContextPrompt(userId?: string): string {
    const user = AuthService.getCurrentUser();
    const memories = this.getMemories(userId);

    const weakTopics = memories
      .filter((m) => m.category === 'weak_topic')
      .map((m) => m.topicOrSubject)
      .slice(0, 3)
      .join(', ');

    const recentDoubts = memories
      .filter((m) => m.category === 'doubt')
      .map((m) => m.summary)
      .slice(0, 3)
      .join('; ');

    return `
[USER PERSONAL CONTEXT & LONG-TERM MEMORY]:
- Name: ${user.name}
- Target Aspiration / Goal: ${user.targetGoal || 'Comprehensive Padhai Se Kamai Tak'}
- Current Study Streak: ${user.currentStreakDays} days
- Total XP: ${user.totalXp}
${weakTopics ? `- Identified Weak Concepts needing gentle reinforcement: ${weakTopics}` : ''}
${recentDoubts ? `- Recent Doubts Solved: ${recentDoubts}` : ''}
${user.memorySummary ? `- Core Persona Note: ${user.memorySummary}` : ''}
(Always treat the user with personal familiarity, acknowledging their target goal and past progress in a supportive, encouraging, national-builder tone!)
`.trim();
  }

  static clearMemories(userId?: string): void {
    const targetUserId = userId || AuthService.getCurrentUser().id;
    const raw = localStorage.getItem(MEMORIES_STORAGE_KEY);
    if (!raw) return;
    try {
      const all: UserMemoryEntry[] = JSON.parse(raw);
      const filtered = all.filter((m) => m.userId !== targetUserId);
      localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(filtered));
    } catch {
      localStorage.removeItem(MEMORIES_STORAGE_KEY);
    }
  }
}
