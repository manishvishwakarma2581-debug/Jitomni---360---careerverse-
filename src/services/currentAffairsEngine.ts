import {
  DailyCurrentAffairItem,
  SpeedOneLinerItem,
  MASTER_DAILY_CURRENT_AFFAIRS,
  DAILY_RAPID_ONE_LINERS,
  ExamDemandCategory,
  CurrentAffairsCategory,
} from '../data/dailyCurrentAffairsData';
import { Language, QuizQuestion } from '../types';

export class CurrentAffairsEngine {
  private static STORAGE_KEY_BOOKMARKS = 'jitomni_current_affairs_bookmarks_v1';
  private static STORAGE_KEY_CUSTOM_DATES = 'jitomni_current_affairs_dates_v1';

  /**
   * Get all registered dates with current affairs
   */
  public static getAvailableDates(): string[] {
    const dates = new Set<string>();
    MASTER_DAILY_CURRENT_AFFAIRS.forEach((item) => dates.add(item.date));

    // Ensure today's date (or 2026-09-09) is present
    const today = '2026-09-09';
    dates.add(today);
    dates.add('2026-09-08');
    dates.add('2026-09-07');

    return Array.from(dates).sort().reverse();
  }

  /**
   * Fetch current affairs items for a specific date or all dates
   */
  public static getItemsForDate(dateStr?: string): DailyCurrentAffairItem[] {
    if (!dateStr || dateStr === 'all') {
      return [...MASTER_DAILY_CURRENT_AFFAIRS];
    }
    const filtered = MASTER_DAILY_CURRENT_AFFAIRS.filter((item) => item.date === dateStr);
    if (filtered.length > 0) {
      return filtered;
    }

    // If a date doesn't have custom items, synthesize date-aligned entries from the master repository
    return MASTER_DAILY_CURRENT_AFFAIRS.map((item, idx) => ({
      ...item,
      id: `${item.id}-${dateStr}-${idx}`,
      date: dateStr,
    }));
  }

  /**
   * Filter items by Exam Demand
   */
  public static filterByExamDemand(
    items: DailyCurrentAffairItem[],
    examDemand: ExamDemandCategory
  ): DailyCurrentAffairItem[] {
    if (examDemand === 'ALL') return items;
    // Every item has full matrix for UPSC, SSC, Banking, State
    return items;
  }

  /**
   * Filter items by Category
   */
  public static filterByCategory(
    items: DailyCurrentAffairItem[],
    category: CurrentAffairsCategory | 'all'
  ): DailyCurrentAffairItem[] {
    if (category === 'all') return items;
    return items.filter((item) => item.category === category);
  }

  /**
   * Search across headlines, analytical context, and speed one-liners
   */
  public static searchItems(items: DailyCurrentAffairItem[], query: string): DailyCurrentAffairItem[] {
    const q = query.toLowerCase().trim();
    if (!q) return items;

    return items.filter((item) => {
      const matchHeadlines =
        item.headline.hi.toLowerCase().includes(q) ||
        item.headline.en.toLowerCase().includes(q) ||
        item.headline.hinglish.toLowerCase().includes(q) ||
        item.subHeadline.hi.toLowerCase().includes(q) ||
        item.subHeadline.en.toLowerCase().includes(q);

      const matchUpsc =
        item.examDemandBreakdown.upscDemand.analyticalContext.hi.toLowerCase().includes(q) ||
        item.examDemandBreakdown.upscDemand.analyticalContext.en.toLowerCase().includes(q);

      const matchSsc =
        item.examDemandBreakdown.sscRailwayDemand.speedSummary.hi.toLowerCase().includes(q) ||
        item.examDemandBreakdown.sscRailwayDemand.speedOneLiners.hi.some((l) => l.toLowerCase().includes(q));

      const matchBanking =
        item.examDemandBreakdown.bankingDemand.financialAngle.hi.toLowerCase().includes(q) ||
        item.examDemandBreakdown.bankingDemand.keyFinancialTerms.some((t) => t.term.toLowerCase().includes(q));

      return matchHeadlines || matchUpsc || matchSsc || matchBanking;
    });
  }

  /**
   * Rapid One-Liners filtered by date and exam target
   */
  public static getRapidOneLiners(dateStr?: string, examDemand?: ExamDemandCategory): SpeedOneLinerItem[] {
    let list = DAILY_RAPID_ONE_LINERS;
    if (examDemand && examDemand !== 'ALL') {
      const targetMap: Record<ExamDemandCategory, string> = {
        ALL: '',
        UPSC: 'UPSC',
        SSC_RAILWAY: 'SSC',
        BANKING: 'Banking',
        STATE_DEFENCE: 'State PSC',
      };
      const key = targetMap[examDemand];
      list = list.filter((ol) => ol.examTargets.includes(key as any));
    }
    return list;
  }

  /**
   * Generate Daily Exam Quiz tailored specifically to the chosen exam demand
   */
  public static generateDailyQuizQuestions(
    items: DailyCurrentAffairItem[],
    examDemand: ExamDemandCategory,
    lang: Language
  ): QuizQuestion[] {
    const quiz: QuizQuestion[] = [];

    items.forEach((item, idx) => {
      if (examDemand === 'UPSC') {
        const u = item.examDemandBreakdown.upscDemand.prelimsMultiStatementQuestion;
        const statementsText = u.statements[lang] || u.statements.hi;
        const fullQuestion = `${u.question[lang] || u.question.hi}\n\n${statementsText.join('\n')}\n\n${
          lang === 'hi'
            ? 'उपर्युक्त कथनों में से कौन-सा/से सही है/हैं?'
            : lang === 'hinglish'
            ? 'Upar diye gaye statements me se kaun sa/se sahi hain?'
            : 'Which of the statements given above is/are correct?'
        }`;

        quiz.push({
          id: `quiz-upsc-${item.id}-${idx}`,
          question: {
            hi: fullQuestion,
            en: fullQuestion,
            hinglish: fullQuestion,
          },
          options: u.options.map((opt) => ({
            hi: `${opt.label}. ${opt.text.hi}`,
            en: `${opt.label}. ${opt.text.en}`,
            hinglish: `${opt.label}. ${opt.text.hinglish}`,
          })),
          correctAnswerIndex: u.correctIndex,
          explanation: u.explanation,
        });
      } else if (examDemand === 'BANKING') {
        const b = item.examDemandBreakdown.bankingDemand.bankingDirectMcq;
        quiz.push({
          id: `quiz-bank-${item.id}-${idx}`,
          question: b.question,
          options: b.options[lang].map((optText) => ({
            hi: optText,
            en: optText,
            hinglish: optText,
          })),
          correctAnswerIndex: b.correctIndex,
          explanation: b.explanation,
        });
      } else if (examDemand === 'STATE_DEFENCE') {
        const d = item.examDemandBreakdown.stateDefenceDemand.defenceOrStateMcq;
        quiz.push({
          id: `quiz-def-${item.id}-${idx}`,
          question: d.question,
          options: d.options[lang].map((optText) => ({
            hi: optText,
            en: optText,
            hinglish: optText,
          })),
          correctAnswerIndex: d.correctIndex,
          explanation: d.explanation,
        });
      } else {
        // SSC & Railway or ALL: Fast Speed MCQs
        const s = item.examDemandBreakdown.sscRailwayDemand.directMcq;
        quiz.push({
          id: `quiz-ssc-${item.id}-${idx}`,
          question: s.question,
          options: s.options[lang].map((optText) => ({
            hi: optText,
            en: optText,
            hinglish: optText,
          })),
          correctAnswerIndex: s.correctIndex,
          explanation: s.explanation,
        });
      }
    });

    return quiz;
  }

  /**
   * Bookmarking System (Stored in LocalStorage)
   */
  public static getBookmarks(): string[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_BOOKMARKS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public static toggleBookmark(id: string): boolean {
    try {
      const current = this.getBookmarks();
      let updated: string[];
      let isBookmarked: boolean;
      if (current.includes(id)) {
        updated = current.filter((item) => item !== id);
        isBookmarked = false;
      } else {
        updated = [...current, id];
        isBookmarked = true;
      }
      localStorage.setItem(this.STORAGE_KEY_BOOKMARKS, JSON.stringify(updated));
      return isBookmarked;
    } catch {
      return false;
    }
  }

  /**
   * Web Speech API helper for reading out Current Affairs headline and summary
   */
  public static speakText(text: string, lang: Language = 'hi', onEnd?: () => void): SpeechSynthesisUtterance | null {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    window.speechSynthesis.cancel(); // cancel any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95; // comfortable study reading speed
    utterance.pitch = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return utterance;
  }

  public static stopSpeaking(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}
