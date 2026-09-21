import { Router, Request, Response } from 'express';
import { 
  ALL_GIG_CATEGORIES, 
  INITIAL_GIG_WORKERS_POOL, 
  GigWorkerProfile, 
  GigBookingRecord 
} from '../../src/data/gigWorkersData.js';

export const gigWorkersRouter = Router();

// In-Memory store for registered workers and pan-india bookings
let gigWorkersList: GigWorkerProfile[] = [...INITIAL_GIG_WORKERS_POOL];

// Category commission map (default 20% across all categories)
const categoryCommissionRates: Record<string, number> = {};
ALL_GIG_CATEGORIES.forEach((cat) => {
  categoryCommissionRates[cat.id] = 0.20; // 20%
});

let gigBookingsList: GigBookingRecord[] = [
  {
    id: 'GIG-BOK-1092',
    categoryId: 'electrician',
    categoryName: 'इलेक्ट्रीशियन (Electrician)',
    customerId: 'cust-892',
    customerName: 'Vivek Chourasia',
    customerPhone: '+91 98260 11920',
    address: 'Flat 402, Royal Palms, Arera Colony',
    city: 'Bhopal',
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    landmark: 'Near 10 No. Market SBI',
    serviceDate: 'Today',
    timeSlot: '11:00 AM - 12:00 PM',
    problemDescription: 'MCB repeatedly tripping when AC switches on + kitchen socket burnt',
    workerId: 'gw-01',
    workerName: 'Rameshwar Sahu',
    workerPhone: '+91 98261 44520',
    workerPhoto: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    totalFare: 350,
    workerEarnings: 280, // 80%
    adminCommission: 70, // 20%
    commissionRate: 0.20,
    startOtp: '4921',
    endOtp: '8832',
    paymentMethod: 'upi',
    paymentStatus: 'paid_via_upi',
    bookingStatus: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'GIG-BOK-1093',
    categoryId: 'plumber',
    categoryName: 'प्लंबर (Plumber)',
    customerId: 'cust-441',
    customerName: 'Pooja Tiwari',
    customerPhone: '+91 94251 77290',
    address: 'B-12, Green City, Kolar Road',
    city: 'Bhopal',
    state: 'Madhya Pradesh (मध्य प्रदेश)',
    landmark: 'Behind D-Mart',
    serviceDate: 'Today',
    timeSlot: '02:30 PM - 03:30 PM',
    problemDescription: 'Bathroom overhead tank pipe leakage and low pressure in tap',
    workerId: 'gw-02',
    workerName: 'Mohammad Imran Ansari',
    workerPhone: '+91 94250 88214',
    workerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    totalFare: 400,
    workerEarnings: 320, // 80%
    adminCommission: 80, // 20%
    commissionRate: 0.20,
    startOtp: '6712',
    endOtp: '1940',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    bookingStatus: 'in_progress',
    createdAt: new Date(Date.now() - 1800000).toISOString()
  }
];

// GET: All categories
gigWorkersRouter.get('/api/gig/categories', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: ALL_GIG_CATEGORIES.length,
    categories: ALL_GIG_CATEGORIES,
    commissionRates: categoryCommissionRates
  });
});

// GET: Filter workers by category, city, max distance
gigWorkersRouter.get('/api/gig/workers', (req: Request, res: Response) => {
  const { category, city, maxDistance } = req.query;
  
  let filtered = [...gigWorkersList];

  if (category && category !== 'all') {
    filtered = filtered.filter(
      (w) => w.primaryCategoryId === category || w.secondaryCategoryIds.includes(category as string)
    );
  }

  if (city && city !== 'all') {
    filtered = filtered.filter(
      (w) => w.city.toLowerCase() === (city as string).toLowerCase()
    );
  }

  if (maxDistance) {
    const distLimit = parseFloat(maxDistance as string);
    if (!isNaN(distLimit) && distLimit > 0) {
      filtered = filtered.filter((w) => w.distanceKm <= distLimit);
    }
  }

  res.json({
    success: true,
    total: filtered.length,
    workers: filtered
  });
});

// POST: Register new Gig Worker with KYC (Aadhaar, Skill, City, Charge)
gigWorkersRouter.post('/api/gig/worker/register', (req: Request, res: Response) => {
  try {
    const {
      name,
      phone,
      whatsapp,
      aadhaarNumber,
      primaryCategoryId,
      secondaryCategoryIds,
      experienceYears,
      state,
      city,
      area,
      chargePerHour,
      chargePerJobMin,
      upiId,
      photoUrl,
      gender
    } = req.body;

    if (!name || !phone || !aadhaarNumber || !primaryCategoryId || !city) {
      return res.status(400).json({
        success: false,
        error: 'Missing mandatory fields: name, phone, aadhaarNumber, primaryCategoryId, city are required.'
      });
    }

    const newWorkerId = `gw-${Date.now().toString().slice(-6)}`;
    const newWorker: GigWorkerProfile = {
      id: newWorkerId,
      name: name.trim(),
      gender: gender || 'male',
      phone: phone.trim(),
      whatsapp: whatsapp || phone,
      aadhaarNumber: aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, 'XXXX-XXXX-$3'),
      aadhaarVerified: true,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      primaryCategoryId,
      secondaryCategoryIds: Array.isArray(secondaryCategoryIds) ? secondaryCategoryIds : [],
      experienceYears: Number(experienceYears) || 1,
      state: state || 'Madhya Pradesh (मध्य प्रदेश)',
      city: city.trim(),
      area: area || 'Central City Hub',
      chargePerHour: Number(chargePerHour) || 199,
      chargePerJobMin: Number(chargePerJobMin) || 149,
      upiId: upiId || `${phone.replace(/\D/g, '')}@upi`,
      rating: 5.0,
      totalReviews: 1,
      completedJobsCount: 0,
      distanceKm: +(Math.random() * 3 + 0.8).toFixed(1),
      etaMinutes: Math.floor(Math.random() * 15 + 10),
      status: 'available',
      verificationBadge: 'gold_verified',
      joinedDate: new Date().toISOString().split('T')[0],
      languages: ['Hindi', 'English'],
      skillsList: [primaryCategoryId, 'Punctual', 'Verified KYC'],
      policeVerificationNo: `POL-IND-KYC-${Math.floor(1000 + Math.random() * 9000)}`
    };

    gigWorkersList.unshift(newWorker);

    return res.status(201).json({
      success: true,
      message: 'Worker KYC successfully registered and verified on Sovereign Network.',
      worker: newWorker
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST: Create Gig Booking (Customer book worker) with 20% commission split
gigWorkersRouter.post('/api/gig/book', (req: Request, res: Response) => {
  try {
    const {
      categoryId,
      customerId,
      customerName,
      customerPhone,
      address,
      city,
      state,
      landmark,
      serviceDate,
      timeSlot,
      problemDescription,
      workerId,
      estimatedFare,
      paymentMethod
    } = req.body;

    const matchedCategory = ALL_GIG_CATEGORIES.find((c) => c.id === categoryId);
    const categoryName = matchedCategory ? matchedCategory.name.hi : 'गिग सर्विस';

    const matchedWorker = gigWorkersList.find((w) => w.id === workerId) || gigWorkersList[0];

    const fare = Number(estimatedFare) || (matchedWorker ? matchedWorker.chargePerHour : 250);
    const commissionRate = categoryCommissionRates[categoryId] || 0.20; // Default 20%
    const adminCommission = Math.round(fare * commissionRate);
    const workerEarnings = fare - adminCommission; // 80%

    const newBooking: GigBookingRecord = {
      id: `GIG-BOK-${Math.floor(1000 + Math.random() * 9000)}`,
      categoryId,
      categoryName,
      customerId: customerId || `cust-${Math.floor(100 + Math.random() * 900)}`,
      customerName: customerName || 'Valued Citizen',
      customerPhone: customerPhone || '+91 98260 00000',
      address: address || 'Main Road',
      city: city || (matchedWorker ? matchedWorker.city : 'Bhopal'),
      state: state || (matchedWorker ? matchedWorker.state : 'Madhya Pradesh'),
      landmark: landmark || 'Near Landmark',
      serviceDate: serviceDate || 'Today',
      timeSlot: timeSlot || 'Immediate (Within 30 Mins)',
      problemDescription: problemDescription || 'General Service Request',
      workerId: matchedWorker ? matchedWorker.id : undefined,
      workerName: matchedWorker ? matchedWorker.name : 'Assigned Worker',
      workerPhone: matchedWorker ? matchedWorker.phone : '+91 93996 08239',
      workerPhoto: matchedWorker ? matchedWorker.photoUrl : undefined,
      totalFare: fare,
      workerEarnings,
      adminCommission,
      commissionRate,
      startOtp: String(Math.floor(1000 + Math.random() * 9000)),
      endOtp: String(Math.floor(1000 + Math.random() * 9000)),
      paymentMethod: paymentMethod || 'cash',
      paymentStatus: paymentMethod === 'upi' ? 'paid_via_upi' : 'pending',
      bookingStatus: 'assigned',
      createdAt: new Date().toISOString()
    };

    gigBookingsList.unshift(newBooking);

    if (matchedWorker) {
      matchedWorker.completedJobsCount += 1;
    }

    return res.status(201).json({
      success: true,
      message: 'Service successfully booked! OTP has been generated for job security.',
      booking: newBooking
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// GET: All Bookings (for Admin and Customer feeds)
gigWorkersRouter.get('/api/gig/bookings', (req: Request, res: Response) => {
  const { city, workerId, customerPhone } = req.query;

  let bookings = [...gigBookingsList];

  if (city && city !== 'all') {
    bookings = bookings.filter((b) => b.city.toLowerCase() === (city as string).toLowerCase());
  }

  if (workerId) {
    bookings = bookings.filter((b) => b.workerId === workerId);
  }

  if (customerPhone) {
    bookings = bookings.filter((b) => b.customerPhone === customerPhone);
  }

  res.json({
    success: true,
    total: bookings.length,
    bookings
  });
});

// GET: Admin Stats & Revenue Analytics
gigWorkersRouter.get('/api/gig/admin/stats', (_req: Request, res: Response) => {
  const totalBookings = gigBookingsList.length;
  const totalGrossRevenue = gigBookingsList.reduce((acc, b) => acc + b.totalFare, 0);
  const totalAdminCommission = gigBookingsList.reduce((acc, b) => acc + b.adminCommission, 0);
  const totalWorkerPayouts = gigBookingsList.reduce((acc, b) => acc + b.workerEarnings, 0);

  res.json({
    success: true,
    stats: {
      totalRegisteredWorkers: gigWorkersList.length,
      verifiedWorkersCount: gigWorkersList.filter((w) => w.verificationBadge === 'gold_verified').length,
      totalBookings,
      totalGrossRevenue,
      totalAdminCommission,
      totalWorkerPayouts,
      defaultCommissionRate: '20%'
    }
  });
});

// POST: Admin worker verification toggle
gigWorkersRouter.post('/api/gig/admin/verify-worker', (req: Request, res: Response) => {
  const { workerId, badge, action } = req.body;
  const worker = gigWorkersList.find((w) => w.id === workerId);

  if (!worker) {
    return res.status(404).json({ success: false, error: 'Worker not found' });
  }

  if (action === 'reject') {
    worker.verificationBadge = 'pending';
    worker.status = 'offline';
  } else {
    worker.verificationBadge = badge || 'gold_verified';
    worker.status = 'available';
  }

  return res.json({
    success: true,
    message: `Worker ${worker.name} status updated to ${worker.verificationBadge}.`,
    worker
  });
});

// POST: Admin update commission rate for a category
gigWorkersRouter.post('/api/gig/admin/update-commission', (req: Request, res: Response) => {
  const { categoryId, commissionRate } = req.body;
  const rate = parseFloat(commissionRate);

  if (isNaN(rate) || rate < 0.05 || rate > 0.40) {
    return res.status(400).json({ success: false, error: 'Commission rate must be between 5% and 40%.' });
  }

  categoryCommissionRates[categoryId] = rate;

  return res.json({
    success: true,
    message: `Commission for category ${categoryId} set to ${(rate * 100).toFixed(0)}%.`,
    commissionRates: categoryCommissionRates
  });
});
