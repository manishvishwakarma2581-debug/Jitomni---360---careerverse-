import { Router } from 'express';
import { aiCache } from '../cache/aiCache';
import { FLASH_MODEL, isQuotaCircuitBreakerActive } from '../ai/geminiClient';

export const healthRouter = Router();

healthRouter.get(['/api/health', '/healthz', '/health', '/_health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    cachedTopicsCount: aiCache.size(),
    model: FLASH_MODEL,
    circuitBreakerActive: isQuotaCircuitBreakerActive(),
  });
});

healthRouter.get('/api/admin/system-stats', (req, res) => {
  res.json({
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    cachedTopicsCount: aiCache.size(),
    timestamp: new Date().toISOString(),
    superAdmin: 'Manish Vishwakarma (Sovereign Leader)',
    krishiDirector: 'Mahi Pawar (Agri-Tech)',
    activeAiModel: FLASH_MODEL,
    circuitBreakerActive: isQuotaCircuitBreakerActive(),
  });
});
