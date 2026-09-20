import { GoogleGenAI } from '@google/genai';

export const FLASH_MODEL = 'gemini-3.8-flash';
export const FALLBACK_FLASH_MODEL = 'gemini-flash-latest';
export const TERTIARY_FALLBACK_MODEL = 'gemini-2.5-flash';
export const QUATERNARY_MODEL = 'gemini-2.0-flash';

let aiClient: GoogleGenAI | null = null;

// QUOTA & RATE LIMIT CIRCUIT BREAKER
// When Google Gemini returns resource_exhausted / quota exceeded, we trip the circuit breaker
// so that subsequent user requests are served instantly from the Sovereign Local Engine & AI Cache
// without wasteful network lag or noisy log spam.
let circuitBreakerUntilTimestamp = 0;
const CIRCUIT_BREAKER_COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes cooldown

export function isQuotaCircuitBreakerActive(): boolean {
  return Date.now() < circuitBreakerUntilTimestamp;
}

export function tripQuotaCircuitBreaker(reason: string = 'Quota exhausted'): void {
  circuitBreakerUntilTimestamp = Date.now() + CIRCUIT_BREAKER_COOLDOWN_MS;
  const resetMinutes = Math.round(CIRCUIT_BREAKER_COOLDOWN_MS / 60000);
  console.warn(
    `[Gemini Circuit Breaker Tripped] ${reason}. Auto-switching to Sovereign Intelligence Engine & Cache for ${resetMinutes} minutes to guarantee instant zero-error user experience.`
  );
}

export function resetQuotaCircuitBreaker(): void {
  circuitBreakerUntilTimestamp = 0;
  console.log('[Gemini Circuit Breaker Reset] Normal API calling resumed.');
}

export function getGenAI(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY' && key.trim() !== '') {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return aiClient;
}

export function validateTopicContent(content: string, topicName: string): boolean {
  if (!content || typeof content !== 'string') return false;
  if (content.includes('Content not available')) return false;
  if (content.trim().length < 15) return false;

  const keywords = topicName
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, ' ')
    .split(/\s+/)
    .filter((k) => k.length > 2);

  if (keywords.length === 0) return true;
  const contentLower = content.toLowerCase();
  return keywords.some((k) => contentLower.includes(k));
}

export async function generateFastContent(
  ai: GoogleGenAI,
  contents: string | any[],
  systemInstruction: string,
  jsonMode: boolean = false
): Promise<any | null> {
  // If quota circuit breaker is active, don't waste time on failing network calls
  if (isQuotaCircuitBreakerActive()) {
    return null;
  }

  const config: any = {
    systemInstruction,
    temperature: 0.1, // Strict factual accuracy
  };
  if (jsonMode) {
    config.responseMimeType = 'application/json';
  }

  const modelsToTry = [FLASH_MODEL, FALLBACK_FLASH_MODEL, TERTIARY_FALLBACK_MODEL, QUATERNARY_MODEL];

  for (let m = 0; m < modelsToTry.length; m++) {
    const model = modelsToTry[m];
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const result = await ai.models.generateContent({
          model,
          contents: contents as any,
          config,
        });
        if (result && result.text) {
          return result;
        }
      } catch (err: any) {
        const errMsg = err?.message || String(err);

        // Detect Daily Quota Exhaustion / 429
        const isQuotaExceeded =
          err?.status === 429 ||
          err?.code === 429 ||
          errMsg.includes('resource_exhausted') ||
          errMsg.includes('quota') ||
          errMsg.includes('rate-limit') ||
          errMsg.includes('generate_requests_per_model_per_day') ||
          errMsg.includes('generate_content_tokens_per_model_per_user');

        if (isQuotaExceeded) {
          tripQuotaCircuitBreaker(`Model ${model} quota limit reached: ${errMsg.slice(0, 120)}`);
          return null; // Immediately fall back to Sovereign Intelligence Engine
        }

        const is503OrUnavailable =
          err?.status === 503 ||
          err?.code === 503 ||
          errMsg.includes('503') ||
          errMsg.includes('high demand') ||
          errMsg.includes('UNAVAILABLE') ||
          errMsg.includes('fetch failed');

        if (is503OrUnavailable && attempt === 0) {
          console.warn(`[Gemini Temporary Spike] Model ${model} returned 503/network issue. Pausing 300ms...`);
          await new Promise((r) => setTimeout(r, 300));
          continue;
        }

        console.warn(`[Gemini Fallback] Model ${model} attempt ${attempt + 1} failed: ${errMsg.slice(0, 100)}`);
        break; // Proceed to next model in cascade
      }
    }
  }

  console.warn('[generateFastContent] All Gemini attempts exhausted. Seamlessly switching to Sovereign Engine.');
  return null;
}
