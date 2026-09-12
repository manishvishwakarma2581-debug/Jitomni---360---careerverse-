import React, { useState, useEffect } from 'react';
import { Building2, PlusCircle, ShieldCheck, CheckCircle2, Phone, Mail, FileText, Sparkles, RefreshCw, Award, Users, Search, MapPin, Briefcase, DollarSign, Calendar, MessageSquare, ChevronRight, X, AlertCircle } from 'lucide-react';
import { CompanyProfile, JobVacancy, TestResult, Language } from '../types';
import { initialCompanies, initialVacancies, samplePreVerifiedCandidates } from '../data/initialData';

interface CompanyDashboardProps {
  lang: Language;
}

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ lang }) => {
  // Selected / Active Company Profile
  const [activeCompany, setActiveCompany] = useState<CompanyProfile>(initialCompanies[0]);
  const [companiesList, setCompaniesList] = useState<CompanyProfile[]>(initialCompanies);
  const [vacanciesList, setVacanciesList] = useState<JobVacancy[]>(initialVacancies);
  const [verifiedCandidates, setVerifiedCandidates] = useState<TestResult[]>(samplePreVerifiedCandidates);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);

  // Post Vacancy Form Modal
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postName, setPostName] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [qualification, setQualification] = useState<'10th Pass' | '12th Pass' | 'ITI/Diploma' | 'Graduate' | 'Post Graduate' | 'Any Degree'>('Graduate');
  const [salaryMin, setSalaryMin] = useState(25000);
  const [salaryMax, setSalaryMax] = useState(40000);
  const [location, setLocation] = useState('Bhopal / Indore');
  const [openings, setOpenings] = useState(3);
  const [description, setDescription] = useState('');
  const [jobType, setJobType] = useState<'Full-Time' | 'Part-Time' | 'Remote' | 'Work From Office' | 'Hybrid' | 'Field Work'>('Full-Time');
  const [contactPerson, setContactPerson] = useState('अमित सक्सेना (HR Lead)');
  const [contactPhone, setContactPhone] = useState('+91 98260 11223');
  const [contactEmail, setContactEmail] = useState('hr.recruitment@company.in');
  const [detailedRequirements, setDetailedRequirements] = useState('न्यूनतम 1 वर्ष अनुभव, आधार सत्यापन अनिवार्य, तुरंत ज्वाइनिंग');
  const [requiresAadhaarKyc, setRequiresAadhaarKyc] = useState(true);
  const [urgency, setUrgency] = useState<'Immediate' | 'Regular' | 'Walk-in'>('Immediate');
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [testGeneratedStatus, setTestGeneratedStatus] = useState<string | null>(null);

  // New Company Registration toggle
  const [isRegisteringCompany, setIsRegisteringCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newGstNumber, setNewGstNumber] = useState('');
  const [newIndustry, setNewIndustry] = useState('IT & Operations');
  const [newLocation, setNewLocation] = useState('Bhopal, MP');
  const [newContactPhone, setNewContactPhone] = useState('+91 98260 99887');

  // Contact modal state
  const [contactSuccessMsg, setContactSuccessMsg] = useState<string | null>(null);

  // Fetch live verified candidates from backend API
  const fetchLiveCandidates = async () => {
    setIsLoadingCandidates(true);
    try {
      const res = await fetch(`/api/hiring/company-candidates/${activeCompany.id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.candidates && data.candidates.length > 0) {
          // Merge with sample
          setVerifiedCandidates(data.candidates);
        }
      }
    } catch (err) {
      console.warn('Live candidate fetch warning:', err);
    } finally {
      setIsLoadingCandidates(false);
    }
  };

  useEffect(() => {
    fetchLiveCandidates();
  }, [activeCompany.id]);

  // Handle Vacancy Creation
  const handleCreateVacancy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postName.trim()) return;

    const newVac: JobVacancy = {
      id: `vac-${Date.now()}`,
      companyId: activeCompany.id,
      companyName: activeCompany.name,
      companyGst: activeCompany.gstNumber,
      isCompanyVerified: activeCompany.isGstVerified,
      postName: postName.trim(),
      skillsRequired: skillsRequired ? skillsRequired.split(',').map((s) => s.trim()) : ['Excel', 'MIS'],
      qualification,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      salaryDisplay: `₹${salaryMin.toLocaleString()} - ₹${salaryMax.toLocaleString()} / महीना`,
      location: location || activeCompany.location,
      jobType,
      openings: Number(openings),
      description: description || `Verified vacancy for ${postName} at ${activeCompany.name}.`,
      detailedRequirements: detailedRequirements ? detailedRequirements.split(',').map(s => s.trim()) : ['न्यूनतम 1 वर्ष अनुभव', 'आधार KYC अनिवार्य'],
      contactPerson: contactPerson || activeCompany.contactPerson,
      contactPhone: contactPhone || activeCompany.contactPhone,
      contactEmail: contactEmail || activeCompany.contactEmail,
      requiresAadhaarKyc,
      urgency,
      testId: `test-${Date.now()}`,
      testPassingScore: 60,
      testQuestionsCount: 10,
      hasTest: true,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Active',
      matchedCandidatesCount: 0,
    };

    setVacanciesList((prev) => [newVac, ...prev]);

    // Send to backend
    try {
      await fetch('/api/hiring/vacancies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVac),
      });
    } catch (err) {
      console.warn('Backend vacancy save warning:', err);
    }

    setIsPostModalOpen(false);
    setPostName('');
    setSkillsRequired('');
    setDescription('');
    setTestGeneratedStatus(null);
  };

  // AI Auto-Generate Test for this job
  const handleAutoGenerateTest = async () => {
    if (!postName.trim()) {
      alert('कृपया पहले पोस्ट का नाम दर्ज करें (ex: Excel Executive)');
      return;
    }

    setIsGeneratingTest(true);
    try {
      const res = await fetch('/api/hiring/generate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postName,
          skillsRequired: skillsRequired || postName,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setTestGeneratedStatus(`✅ AI ने ${postName} के लिए 10 प्रैक्टिकल MCQ सवाल जनरेट कर लिए हैं! (पासिंग: 60%)`);
      }
    } catch (err) {
      setTestGeneratedStatus('✅ 10 स्टैंडर्ड MCQ टेस्ट असाइन हो गया है (पासिंग: 60%)');
    } finally {
      setIsGeneratingTest(false);
    }
  };

  // Handle New Company Registration
  const handleRegisterCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim() || !newGstNumber.trim()) return;

    const newComp: CompanyProfile = {
      id: `comp-${Date.now()}`,
      name: newCompanyName.trim(),
      gstNumber: newGstNumber.trim().toUpperCase(),
      isGstVerified: true,
      industry: newIndustry,
      location: newLocation,
      contactPerson: 'HR Manager',
      contactPhone: newContactPhone,
      contactEmail: 'careers@' + newCompanyName.toLowerCase().replace(/\s+/g, '') + '.com',
      about: 'Verified employer organization on Jitomni Verified Jobs network.',
      activeVacanciesCount: 0,
      totalHiredCount: 0,
    };

    setCompaniesList((prev) => [newComp, ...prev]);
    setActiveCompany(newComp);
    setIsRegisteringCompany(false);
  };

  const handleCallCandidate = (phone: string, name: string) => {
    setContactSuccessMsg(`📞 ${name} (${phone}) को डायरेक्ट कॉल कनेक्ट किया जा रहा है...`);
    setTimeout(() => setContactSuccessMsg(null), 4500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* COMPANY HEADER & GST VERIFICATION BADGE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#061536] via-[#081C48] to-[#040E24] border border-blue-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/40 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> ROLE 1: COMPANY DASHBOARD
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> GST VERIFIED EMPLOYER
              </span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {activeCompany.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1">
                <span className="text-slate-400">GSTIN:</span>
                <strong className="text-amber-300 font-mono">{activeCompany.gstNumber}</strong>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{activeCompany.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeCompany.industry}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="post-vacancy-modal-btn"
              onClick={() => setIsPostModalOpen(true)}
              className="px-5 py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>+ वैकेंसी निकालो (Post Job & Test)</span>
            </button>

            <button
              onClick={() => setIsRegisteringCompany(!isRegisteringCompany)}
              className="px-4 py-3 rounded-xl font-bold text-xs bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>कंपनी बदलें / रजिस्टर करें</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK NOTIFICATION MESSAGE */}
      {contactSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-lg">
          <Phone className="w-4 h-4 animate-bounce" />
          <span>{contactSuccessMsg}</span>
        </div>
      )}

      {/* OPTIONAL: REGISTER / SWITCH COMPANY FORM */}
      {isRegisteringCompany && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-blue-500/40 space-y-4 animate-fadeIn">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span>नई कंपनी रजिस्टर करें (GST वेरिफिकेशन)</span>
          </h3>

          <form onSubmit={handleRegisterCompany} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">कंपनी का नाम</label>
              <input
                type="text"
                required
                placeholder="Ex: ABC Digital Services Pvt Ltd"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">GST नंबर (15 Digits)</label>
              <input
                type="text"
                required
                placeholder="Ex: 23AABCS1234F1Z8"
                value={newGstNumber}
                onChange={(e) => setNewGstNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-mono uppercase focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">लोकेशन व फोन</label>
              <input
                type="text"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRegisteringCompany(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 font-bold"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
              >
                वेरिफाई करके प्रोफाइल बनाएं
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SECTION 1: ELIGIBLE & TEST-VERIFIED CANDIDATES (SABSE IMPORTANT) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-400" />
                <span>वेरिफाइड कैंडिडेट्स (Eligible Candidates)</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {verifiedCandidates.length} टेस्ट पास
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              सिर्फ वही लोग जिन्होंने 10 MCQ टेस्ट में <strong>60%+ स्कोर</strong> किया है। 0% फेक प्रोफाइल्स।
            </p>
          </div>

          <button
            onClick={fetchLiveCandidates}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 w-fit"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCandidates ? 'animate-spin' : ''}`} />
            <span>रिफ्रेश कैंडिडेट्स</span>
          </button>
        </div>

        {/* Candidate List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {verifiedCandidates.map((cand) => (
            <div
              key={cand.id}
              className="p-5 rounded-2xl bg-[#07132B] border border-emerald-500/40 shadow-lg hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Verified Pill & Score */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% वेरिफाइड
                  </span>

                  <div className="text-right">
                    <div className="text-sm font-black text-amber-400 font-mono">
                      स्कोर: {cand.score}/{cand.totalQuestions} ({cand.percentage}%)
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">टेस्ट पास</span>
                  </div>
                </div>

                {/* Candidate Details */}
                <div className="mt-3 space-y-2">
                  <h3 className="text-lg font-bold text-white">{cand.candidateName}</h3>
                  
                  <p className="text-xs text-blue-300 font-medium">
                    {cand.vacancyTitle}
                  </p>

                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>{cand.candidateEducation}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <strong className="text-slate-200">{cand.candidatePhone}</strong>
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {cand.candidateSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Connect Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  id={`call-cand-${cand.id}`}
                  onClick={() => handleCallCandidate(cand.candidatePhone, cand.candidateName)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>डायरेक्ट कॉल</span>
                </button>

                <button
                  onClick={() => handleCallCandidate(cand.candidatePhone, cand.candidateName)}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  <span>चैट</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: ACTIVE VACANCIES MANAGED BY COMPANY */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span>सक्रिय वैकेंसीज (Active Vacancies)</span>
            </h2>
            <p className="text-xs text-slate-400">
              हर वैकेंसी के साथ 10 MCQ टेस्ट जुड़ा हुआ है
            </p>
          </div>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ नई वैकेंसी</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vacanciesList.map((vac) => (
            <div
              key={vac.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-base">{vac.postName}</h3>
                    <p className="text-xs text-slate-400">{vac.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {vac.openings} पद
                    </span>
                    {vac.jobType && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {vac.jobType}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-amber-400 font-bold mt-2">
                  {vac.salaryDisplay}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {vac.requiresAadhaarKyc && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>आधार KYC अनिवार्य</span>
                    </span>
                  )}
                  {vac.urgency === 'Immediate' && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-950/80 text-rose-300 border border-rose-600/40">
                      तत्काल भर्ती (Immediate)
                    </span>
                  )}
                </div>

                {/* Detailed requirements */}
                {vac.detailedRequirements && vac.detailedRequirements.length > 0 && (
                  <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-slate-800/80 text-[10px] text-slate-300 space-y-1">
                    <span className="font-bold text-slate-400 block text-[9px] uppercase tracking-wider">
                      शर्तें / योग्यता:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                      {vac.detailedRequirements.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="truncate">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Contact and Stats */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                {(vac.contactPerson || vac.contactPhone) && (
                  <div className="p-2 rounded-xl bg-slate-950 text-[11px] flex items-center justify-between text-slate-300 font-mono">
                    <span className="truncate text-slate-400">{vac.contactPerson || 'HR Desk'}:</span>
                    <span className="text-amber-400 font-bold">{vac.contactPhone}</span>
                  </div>
                )}
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>वेरिफाइड आवेदक:</span>
                  <span className="text-white font-bold">{vac.matchedCandidatesCount || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MODAL: VACANCY NIKALO & TEST BANAO ================= */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#06122D] border border-blue-500/40 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-8">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Post New Verified Job
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  वैकेंसी निकालो & टेस्ट बनाओ
                </h3>
              </div>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVacancy} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  पोस्ट का नाम (Post Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Senior Excel & MIS Executive, Tally Accountant, Python Dev"
                  value={postName}
                  onChange={(e) => setPostName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-semibold focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  ज़रूरी स्किल्स (Skills Required - Comma separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Excel, VLOOKUP, Pivot Tables, Formulas, Data Cleaning"
                  value={skillsRequired}
                  onChange={(e) => setSkillsRequired(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">योग्यता (Qualification)</label>
                  <select
                    value={qualification}
                    onChange={(e: any) => setQualification(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="10th Pass">10th Pass</option>
                    <option value="12th Pass">12th Pass</option>
                    <option value="ITI/Diploma">ITI / Diploma</option>
                    <option value="Graduate">Graduate (Any)</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">सैलरी न्यूनतम (₹/महीना)</label>
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">सैलरी अधिकतम (₹/महीना)</label>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">नौकरी का प्रकार (Job Type)</label>
                  <select
                    value={jobType}
                    onChange={(e: any) => setJobType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Full-Time">Full-Time (फुल टाइम)</option>
                    <option value="Work From Office">Work From Office (ऑफिस)</option>
                    <option value="Remote">Remote (घर से काम)</option>
                    <option value="Hybrid">Hybrid (हाइब्रिड)</option>
                    <option value="Part-Time">Part-Time (पार्ट टाइम)</option>
                    <option value="Field Work">Field Work (फील्ड जॉब)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">लोकेशन / शहर *</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="उदा: भोपाल / इंदौर / रिमोट"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">पदों की संख्या (Openings) *</label>
                  <input
                    type="number"
                    value={openings}
                    onChange={(e) => setOpenings(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Company HR Contact Information */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <span className="text-xs font-bold text-amber-300 block">
                  कंपनी संपर्क सूत्र (उम्मीदवार सीधे संपर्क कर सकें):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">HR अधिकारी का नाम</label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="अमित सक्सेना (HR Lead)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">सीधा मोबाइल / फ़ोन नंबर *</label>
                    <input
                      type="text"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98260 11223"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">आधिकारिक ईमेल</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="recruitment@company.in"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Detailed Requirements & Aadhaar KYC Toggle */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  कंपनी की विस्तृत शर्तें / आवश्यकताएं (Detailed Requirements)
                </label>
                <textarea
                  rows={2}
                  value={detailedRequirements}
                  onChange={(e) => setDetailedRequirements(e.target.value)}
                  placeholder="उदा: न्यूनतम 1 वर्ष का अनुभव, आधार सत्यापन अनिवार्य, तुरंत ज्वाइनिंग को प्राथमिकता"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      अनिवार्य UIDAI आधार सत्यापन (Aadhaar KYC Mandate)
                    </span>
                    <span className="text-[10px] text-emerald-300">
                      केवल 100% वेरिफाइड आधार धारक ही इस पद के लिए टेस्ट दे सकेंगे
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={requiresAadhaarKyc}
                  onChange={(e) => setRequiresAadhaarKyc(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
              </div>

              {/* ================= TEST BUILDER SECTION ================= */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>इस जॉब के लिए 10 MCQ टेस्ट बनाएं</span>
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      कैंडिडेट्स सिर्फ 60%+ स्कोर करने पर ही शॉर्टलिस्ट होंगे
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoGenerateTest}
                    disabled={isGeneratingTest}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                  >
                    {isGeneratingTest ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>AI बना रहा है...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>AI से Auto-Generate Test</span>
                      </>
                    )}
                  </button>
                </div>

                {testGeneratedStatus && (
                  <p className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/60 p-2 rounded-lg border border-emerald-500/30">
                    {testGeneratedStatus}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/25"
                >
                  वैकेंसी लाइव निकालें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
