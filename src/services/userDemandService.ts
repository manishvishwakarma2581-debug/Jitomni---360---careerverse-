export interface UserDemand {
  id: string;
  createdAt: string;
  userName: string;
  userContact: string; // phone, WhatsApp, or email
  userRole: string; // e.g. student, neet, jee, aspirant, jobseeker, farmer, labour, other
  category: 'new_feature' | 'exam_notes_demand' | 'missing_item_bug' | 'help_query';
  targetModule: string;
  title: string;
  description: string;
  urgency: 'normal' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'implemented';
  adminNotes?: string;
  resolvedAt?: string;
}

const STORAGE_KEY = 'jitomni_user_demands_v1';

const INITIAL_DEMANDS: UserDemand[] = [
  {
    id: 'DEMAND-2026-NEET-01',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
    userName: 'अमित कुमार (NEET 2026 Aspirant)',
    userContact: '+91 98765 43210',
    userRole: '🩺 NEET / मेडिकल आकांक्षी',
    category: 'exam_notes_demand',
    targetModule: 'Module 2: Competitive Exams & Module 13: Doubt Solver',
    title: 'NEET 2026 परीक्षा की तैयारी के लिए सम्पूर्ण रोडमैप और NCERT बायोलॉजी टेस्ट चाहिए',
    description: 'मुझे NEET 2026 के लिए सही तैयारी का तरीका, NCERT बायोलॉजी लाइन-बाय-लाइन रिवीजन और फिजिक्स-केमिस्ट्री के टाइम-बाउंड टेस्ट चाहिए।',
    urgency: 'urgent',
    status: 'implemented',
    adminNotes: 'सॉवरेन AI डाउट सॉल्वर और कॉम्पिटिटिव एग्जाम हब में NEET 2026 का 720/720 3-चरणीय सम्पूर्ण रोडमैप, NCERT वेटेज व डायरेक्ट 1-क्लिक एक्सेस जोड़ दिया गया है।',
    resolvedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
  },
  {
    id: 'DEMAND-2026-JOB-02',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 3).toISOString(),
    userName: 'प्रिया शर्मा (AI Freelancer)',
    userContact: 'priya.ai@gmail.com',
    userRole: '💼 नौकरी आकांक्षी / फ्रीलांसर',
    category: 'new_feature',
    targetModule: 'Module 10: Global High-Paying AI Jobs',
    title: 'सिंगापुर और यूएसए रिमोट जॉब्स के लिए n8n और Claude 3.5 Sonnet टूल्स की ट्रेनिंग',
    description: 'विदेश की कंपनियों में घर बैठे डॉलर ($35-$80/hr) में काम करने के लिए सटीक AI टूल्स और हायरिंग पोर्टल्स का लिंक चाहिए।',
    urgency: 'high',
    status: 'implemented',
    adminNotes: 'ग्लोबल AI जॉब्स हब (Module 10) में सिंगापुर टेक हब, NodeFlair पोर्टल्स और n8n प्रॉम्प्ट इंजीनियरिंग रोडमैप लाइव कर दिया गया है।',
    resolvedAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
  },
  {
    id: 'DEMAND-2026-ITI-03',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 4).toISOString(),
    userName: 'राहुल विश्वकर्मा (ITI Fitter)',
    userContact: '+91 94250 11223',
    userRole: '🛠️ ITI / वोकेशनल छात्र',
    category: 'exam_notes_demand',
    targetModule: 'Module 4: ITI Sovereign Hub',
    title: 'रेलवे ALP और NCVT CBT के लिए वर्कशॉप कैलकुलेशन और इंजीनियरिंग ड्राइंग',
    description: 'फिटर व इलेक्ट्रीशियन ट्रेड के लिए NIMI पैटर्न मॉक टेस्ट और सुरक्षा संकेत चार्ट उपलब्ध कराएं।',
    urgency: 'high',
    status: 'implemented',
    adminNotes: 'ITI हब (Module 4) में 100% NIMI पैटर्न CBT टेस्ट, वर्कशॉप कैलकुलेशन और ALP गाइड लाइव है।',
    resolvedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
  }
];

export class UserDemandService {
  public static async getDemands(): Promise<UserDemand[]> {
    try {
      // First attempt backend fetch
      const res = await fetch('/api/user-demands');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.demands) && data.demands.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.demands));
          return data.demands;
        }
      }
    } catch (e) {
      console.warn('Network fetch for user demands failed, falling back to local storage', e);
    }

    // LocalStorage fallback
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (err) {
        console.error('Error parsing stored demands:', err);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMANDS));
    return INITIAL_DEMANDS;
  }

  public static async submitDemand(
    demand: Omit<UserDemand, 'id' | 'createdAt' | 'status'>
  ): Promise<UserDemand> {
    const newId = `DEMAND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullDemand: UserDemand = {
      ...demand,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    // Save locally
    const current = await this.getDemands();
    const updated = [fullDemand, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Try posting to backend
    try {
      await fetch('/api/user-demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullDemand),
      });
    } catch (err) {
      console.warn('Could not sync demand with backend:', err);
    }

    return fullDemand;
  }

  public static async updateDemandStatus(
    id: string,
    status: UserDemand['status'],
    adminNotes?: string
  ): Promise<boolean> {
    const current = await this.getDemands();
    const idx = current.findIndex((d) => d.id === id);
    if (idx === -1) return false;

    current[idx].status = status;
    if (adminNotes !== undefined) current[idx].adminNotes = adminNotes;
    if (status === 'implemented') current[idx].resolvedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));

    try {
      await fetch(`/api/user-demands/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      });
    } catch (err) {
      console.warn('Could not sync status update with backend:', err);
    }

    return true;
  }

  public static async deleteDemand(id: string): Promise<boolean> {
    const current = await this.getDemands();
    const filtered = current.filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    try {
      await fetch(`/api/user-demands/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('Could not sync delete with backend:', err);
    }

    return true;
  }
}
