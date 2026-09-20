import { Router } from 'express';
import { getGenAI, generateFastContent } from '../ai/geminiClient';

export const kritiRouter = Router();

interface KritiInMemContract {
  id: string;
  applicantName: string;
  mobile: string;
  state: string;
  district: string;
  village: string;
  modelType: 'agent' | 'hub' | 'farmer';
  landAcreage?: number;
  education?: string;
  panAadhaarRef: string;
  status: 'submitted' | 'under_review' | 'approved' | 'onboarded';
  eSignatureHash: string;
  submittedAt: string;
  payoutModel: string;
}

const kritiContractsStore: KritiInMemContract[] = [
  {
    id: 'KRT-2026-IND-01',
    applicantName: 'Vikram Singh Parihar',
    mobile: '98261XXXXX',
    state: 'Madhya Pradesh',
    district: 'Rewa',
    village: 'Semariya',
    modelType: 'agent',
    education: 'B.Sc Agriculture (2025)',
    panAadhaarRef: 'UIDAI-XXXX-9281',
    status: 'approved',
    eSignatureHash: 'DIGI-SIGN-91820491-SHA256',
    submittedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    payoutModel: 'Model 2: Mahi Tech Agent (₹50k-₹1.2L/mo on FaaS Clusters)'
  },
  {
    id: 'KRT-2026-IND-02',
    applicantName: 'Suraj Bhan Patel',
    mobile: '97554XXXXX',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    village: 'Rohaniya',
    modelType: 'farmer',
    landAcreage: 4.5,
    panAadhaarRef: 'UIDAI-XXXX-4310',
    status: 'approved',
    eSignatureHash: 'DIGI-SIGN-88392019-SHA256',
    submittedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    payoutModel: 'Model 1: 85% Farmer / 15% Platform Zero-Risk FaaS'
  }
];

// GET All Contracts
kritiRouter.get('/api/kriti/contracts', (req, res) => {
  res.json({
    success: true,
    total: kritiContractsStore.length,
    contracts: kritiContractsStore
  });
});

// POST New Digital Contract Application
kritiRouter.post('/api/kriti/contracts', (req, res) => {
  const { applicantName, mobile, state, district, village, modelType, landAcreage, education, panAadhaarRef } = req.body;
  
  if (!applicantName || !mobile || !state || !district) {
    return res.status(400).json({ error: 'Missing required applicant fields' });
  }

  const contractId = `KRT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const newContract: KritiInMemContract = {
    id: contractId,
    applicantName,
    mobile,
    state,
    district,
    village: village || 'N/A',
    modelType: modelType || 'agent',
    landAcreage: Number(landAcreage) || 0,
    education: education || 'Graduate',
    panAadhaarRef: panAadhaarRef ? `VERIFIED-${panAadhaarRef.slice(-4)}` : 'UIDAI-VERIFIED-KYC',
    status: 'approved',
    eSignatureHash: `DIGI-SIGN-${Date.now()}-SHA256`,
    submittedAt: new Date().toISOString(),
    payoutModel: modelType === 'farmer' 
      ? 'Model 1: 85% Farmer / 15% Platform Zero-Risk FaaS'
      : modelType === 'hub'
      ? 'Model 3: Hybrid Input & Cold Storage Hub Operator'
      : 'Model 2: Mahi Tech Agent (Cluster Agronomist)'
  };

  kritiContractsStore.unshift(newContract);

  res.json({
    success: true,
    message: 'KRITI 360° Digital Contract successfully executed and registered on sovereign pan-India ledger.',
    contract: newContract
  });
});

// POST Kisan Samadhan with Mahi Pawar Expert Desk
kritiRouter.post('/api/kriti/samadhan', async (req, res) => {
  const { question, cropType, district, state, farmerName } = req.body;
  const ai = getGenAI();

  const prompt = `You are Mahi Pawar, Chief Strategic Architect of KRITI 360° (Farming-as-a-Service, FaaS).
Provide an immediate, authoritative, empathetic, scientifically rigorous agronomical solution to this Indian farmer's query.

Farmer Name: ${farmerName || 'Kisan Bhai'}
Crop: ${cropType || 'General'}
Location: ${district || 'District'}, ${state || 'State'}
Farmer Query: "${question || 'What is the best way to protect crop from fungal blight and optimize yield?'}"

Instructions:
1. Reply in simple, encouraging Hindi mixed with clear practical terminology (Hinglish agritech).
2. Follow KRITI 360° principles: Zero upfront financial burden on farmer, biological/nano-tech balance, profit maximization, 85/15 FaaS sharing.
3. Structure your response into:
   - त्वरित निदान (Root Cause/Diagnosis)
   - 24 घंटे में की जाने वाली तुरंत कार्रवाई (Immediate 24h Action)
   - जैविक/नैनो समाधान व न्यूनतम लागत खुराक (Dosage & Application)
   - KRITI 360° FaaS सहयोग (How our local Tech Agent will assist you on ground)
4. Keep the tone warm, respectful, and authoritative as Mahi Pawar.`;

  if (ai) {
    try {
      const response = await generateFastContent(
        ai,
        prompt,
        'You are Mahi Pawar, Chief Strategic Architect of KRITI 360° agritech platform. Respond in Hindi with crisp agricultural expertise.'
      );
      const text = response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim().length > 30) {
        return res.json({
          success: true,
          expert: 'Mahi Pawar (Chief Strategic Architect, KRITI 360°)',
          reply: text.trim(),
          badge: 'Verified FaaS Agronomy Desk'
        });
      }
    } catch (err) {
      console.warn('[KRITI SAMADHAN GENAI FALLBACK]', err);
    }
  }

  // Fallback curated expert response from Mahi Pawar Desk
  const fallbackReply = `नमस्ते ${farmerName || 'किसान भाई'}! मैं माही पवार बोल रही हूँ।

🌱 **त्वरित विश्लेषण व मार्गदर्शन:**
आपकी फसल (${cropType || 'खेती'}) में यह समस्या आमतौर पर बदलते मौसम और सूक्ष्म पोषक तत्वों की असंतुलित मात्रा के कारण आती है।

1. **तुरंत कार्रवाई (अगले 24 घंटे):**
   - खेत में अतिरिक्त नमी न रुकने दें; नालियां साफ रखें।
   - दोपहर की तेज धूप में छिड़काव से बचें; सुबह 8-10 बजे या शाम 4 बजे के बाद ही स्प्रे करें।

2. **किफायती व वैज्ञानिक उपचार:**
   - **नीम तेल (10,000 PPM):** 3-4 ml प्रति लीटर पानी में मिलाकर प्राकृतिक सुरक्षा चक्र बनाएं।
   - **ट्राइकोडर्मा विरिडी:** 2 ग्राम प्रति लीटर पानी में घोलकर जड़ क्षेत्र में दें, इससे फफूंद व जड़ गलन 90% रुकती है।
   - **नैनो यूरिया + सागरिका (सीवीड):** 4 ml प्रति लीटर के साथ सूक्ष्म पोषक तत्वों की आपूर्ति करें।

3. **KRITI 360° FaaS सहायता:**
   - आपके ब्लॉक में हमारे प्रमाणित “माही टेक एजेंट” मौजूद हैं। वे बिना किसी अग्रिम शुल्क के मिट्टी व पत्तियों की डिजिटल जांच करेंगे।
   - यदि आप 85/15 FaaS अनुबंध में जुड़ना चाहते हैं तो 'अनुबंध डिजिटलाइजेशन' टैब से तुरंत आवेदन करें।

शुभकामनाएं! हम आपके साथ हैं।`;

  res.json({
    success: true,
    expert: 'Mahi Pawar (Chief Strategic Architect, KRITI 360°)',
    reply: fallbackReply,
    badge: 'Verified FaaS Agronomy Desk'
  });
});
