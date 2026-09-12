# JITOMNI 360° CAREERVERSE — NATIVE PLAY STORE APP DEVELOPER HANDOVER GUIDE
**Mission:** "Padhai Se Kamai Tak" • Sovereign Career & Verified Jobs Platform  
**Founding Super Admin:** Manish Vishwakarma (`manishvishwakarma2581@gmail.com`)  
**Agricultural Director:** Mahi Pawar (`mahipawar.krishi@jitomni.com`)  

---

## 📌 कार्यकारी सारांश (Executive Summary for App Developer)
यह वेब एप्लिकेशन आधुनिक **PWA (Progressive Web App)** मानकों (Web App Manifest, Service Worker Caching, Standalone Display, Icons) के साथ शत-प्रतिशत तैयार है। किसी भी नेटिव ऐप डेवलपर को इसे स्क्रैच से दोबारा लिखने की आवश्यकता नहीं है। इसे Google द्वारा अनुशंसित **TWA (Trusted Web Activity)** आर्किटेक्चर के माध्यम से 1 दिन के भीतर Google Play Store पर APK/AAB के रूप में पब्लिश किया जा सकता है।

---

## 🛠️ डेवलपर हेतु कार्य सूची (App Developer Action Checklist)

### 1. सिस्टम आवश्यकताएं (Prerequisites)
- **Node.js**: v18+ या v20 LTS
- **Java JDK**: OpenJDK 17 (Android SDK कम्पैटिबल)
- **Android Command Line Tools / Android Studio**: Android SDK Build-Tools 34+
- **Google Play Console डेवलपर अकाउंट**: $25 वन-टाइम रजिस्ट्रेशन

---

### 2. Google TWA / Bubblewrap द्वारा 1-कमांड बिल्ड (Recommended)
Google की आधिकारिक **Bubblewrap CLI** का उपयोग करके वेबसाइट को सीधे नेटिव Android AAB में पैकेज करें:

```bash
# 1. Bubblewrap CLI को ग्लोबली इंस्टॉल करें
npm install -g @bubblewrap/cli

# 2. प्रोजेक्ट डायरेक्टरी में TWA इनिशियलाइज करें
bubblewrap init --manifest=https://ais-pre-bi42jop7h44atikl2zspmv-877762966143.asia-southeast1.run.app/manifest.webmanifest

# 3. पूछे जाने पर निम्नलिखित पैरामीटर्स सेट करें:
# Package Name: com.jitomni.careerverse
# App Name: JITOMNI 360° Careerverse
# Launch URL: https://your-custom-domain.com/
# Status Bar Color: #030B1E
# Navigation Bar Color: #030B1E

# 4. रिलीज की-स्टोर (Keystore) जनरेट करें और AAB बिल्ड करें
bubblewrap build
```

---

### 3. डिजिटल एसेट लिंक्स (Digital Asset Links - `assetlinks.json`)
Play Store ऐप में ऊपर URL बार न दिखे और यह 100% फुल-स्क्रीन नेटिव दिखे, इसके लिए SHA-256 फिंगरप्रिंट की आवश्यकता होती है:

1. की-स्टोर का SHA-256 फिंगरप्रिंट निकालें:
```bash
keytool -list -v -keystore ./android.keystore -alias android
```
2. आउटपुट में प्राप्त `SHA256: 14:6D:E9:...` स्ट्रिंग को `/public/.well-known/assetlinks.json` में पेस्ट करें।
3. यह फ़ाइल पहले से ही प्रोजेक्ट में मौजूद है और सर्वर से लाइव सर्व हो रही है।

---

### 4. पेमेंट गेटवे लाइव इंटीग्रेशन (Razorpay / Cashfree Production)
वर्तमान में सिस्टम में ₹9 से ₹49 की प्रारंभिक नॉमिनल टोकन फीस और डायनामिक UPI QR कोड इंजन सक्रिय है। प्रोडक्शन हेतु:
1. **Razorpay Dashboard** पर मर्चेंट अकाउंट एक्टिवेट करें (KYC पूर्ण करें)।
2. `.env` में निम्नलिखित कीज जोड़ें:
   ```env
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
   RAZORPAY_KEY_SECRET=yyyyyyyyyyyyyyyy
   ```
3. `server.ts` में `/api/payments/razorpay/create-order` और `/api/payments/razorpay/verify-signature` वेबहुक कनेक्ट करें।
4. ऑन-डिमांड साथी राइड्स का 90/10 स्प्लिट और टास्क का 80/20 स्प्लिट Razorpay Route (Linked Accounts) द्वारा सीधे साथी के बैंक खाते में ट्रांसफर होगा।

---

### 5. पुश नोटिफिकेशन्स (Firebase Cloud Messaging - FCM)
सरकारी नौकरी के नए अलर्ट्स, मौसम चेतावनी और किसान समाधान नोटिफिकेशन्स हेतु:
1. Firebase Console में नया प्रोजेक्ट बनाएं: `jitomni-careerverse`
2. `google-services.json` को Android प्रोजेक्ट में शामिल करें।
3. `/public/sw.js` में `firebase-messaging-sw.js` बैकग्राउंड हैंडलर जोड़ें।

---

### 6. Google Play Store सबमिशन चेकलिस्ट
- **App Title**: `JITOMNI 360° - Padhai Se Kamai Tak`
- **Short Description**: `Sovereign Verified Jobs, School (1-12), ITI, IIT, Krishi & Tasks`
- **Full Description**: `Padhai Se Kamai Tak mission to eliminate fake profiles and skill gaps across India. 100% Aadhaar & Degree verified talent, AI mock interviews, On-Demand Companion services, and Krishi 360° Agri-Tech.`
- **App Icon**: 512x512 PNG (32-bit with alpha) - `/public/jitomni_emblem_logo.png` उपलब्ध है।
- **Feature Graphic**: 1024x500 JPG/PNG
- **Screenshots**: न्यूनतम 4 फोन स्क्रीनशॉट्स (1080x1920 या 1080x2400)
- **Privacy Policy URL**: `https://your-domain.com/privacy-policy`

---

## 👑 एडमिनिस्ट्रेटिव रोल्स (Sovereign Administration)
- **Super Admin (मनीष विश्वकर्मा)**: सम्पूर्ण 14 मॉड्यूल्स का पूर्ण नियंत्रण, रेवेन्यू लेजर व यूजर डेटाबेस।
- **Agricultural Director (माहि पवार)**: कृषि 360° हब, दैनिक मंडी भाव, फसल डॉक्टर डायग्नोसिस, CHC मशीनरी रेंटिंग व किसान समाधान हेल्पडेस्क।
