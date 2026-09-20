import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Modular Route Controllers
import { healthRouter } from './server/routes/health';
import { geminiRouter } from './server/routes/gemini';
import { vacanciesAndJobsRouter } from './server/routes/vacanciesAndJobs';
import { hiringRouter } from './server/routes/hiring';
import { companionRouter } from './server/routes/companion';
import { kritiRouter } from './server/routes/kriti';
import { adminAndDemandsRouter } from './server/routes/adminAndDemands';

dotenv.config();

const app = express();
const PORT = 3000;

// Global process error handlers to prevent silent crashes
process.on('unhandledRejection', (reason, promise) => {
  console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// JSON body parsing with reasonable limit for base64 / documents
app.use(express.json({ limit: '10mb' }));

// Security & stability response headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// High-accuracy In-Memory Rate Limiter (Protects APIs against spam & abuse)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 150;

app.use('/api', (req, res, next) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'आपकी सुरक्षा हेतु दर सीमा लागू है। कृपया 1 मिनट बाद पुनः प्रयास करें।',
      retryAfterSeconds: Math.ceil((record.resetAt - now) / 1000),
    });
  }

  record.count += 1;
  next();
});

// ============================================================
// MOUNT MODULAR SOVEREIGN SUB-ROUTERS
// ============================================================
app.use(healthRouter);
app.use(geminiRouter);
app.use(vacanciesAndJobsRouter);
app.use(hiringRouter);
app.use(companionRouter);
app.use(kritiRouter);
app.use(adminAndDemandsRouter);

// ============================================================
// VITE MIDDLEWARE & STATIC PRODUCTION SERVING
// ============================================================
async function startServer() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      // Determine correct dist directory across various container working directories
      const cwd = process.cwd();
      const possibleDistPaths = [
        path.join(cwd, 'dist'),
        typeof __dirname !== 'undefined' && fs.existsSync(path.join(__dirname, 'index.html')) ? __dirname : '',
        typeof __dirname !== 'undefined' && fs.existsSync(path.join(__dirname, '..', 'dist', 'index.html')) ? path.join(__dirname, '..', 'dist') : '',
        '/app/applet/dist',
        '/app/dist',
      ].filter(p => Boolean(p && fs.existsSync(path.join(p, 'index.html'))));

      const distPath = possibleDistPaths[0] || path.join(cwd, 'dist');
      console.log(`[Production] Serving static client bundle from: ${distPath}`);

      app.use(
        express.static(distPath, {
          setHeaders: (res, filePath) => {
            if (filePath.endsWith('.html')) {
              res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
              res.setHeader('Pragma', 'no-cache');
              res.setHeader('Expires', '0');
            }
          },
        })
      );

      app.get('*', (req, res) => {
        const indexPath = path.join(distPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          res.sendFile(indexPath);
        } else {
          res.status(200).send(`
            <!DOCTYPE html>
            <html>
              <head><title>JITOMNI 360°</title></head>
              <body style="font-family:sans-serif;background:#030B1E;color:#fff;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;">
                <div style="text-align:center;">
                  <h2>JITOMNI 360° Sovereign Platform Initializing...</h2>
                  <p>Deployment rollout in progress. Please refresh momentarily.</p>
                </div>
              </body>
            </html>
          `);
        }
      });
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`JITOMNI 360° Education Server successfully bound to 0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Fatal: Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
