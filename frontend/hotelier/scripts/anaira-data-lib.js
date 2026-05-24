/**
 * ============================================================================
 * Anaira Glamping & Resort — Shared Data Library
 * ============================================================================
 *
 * Browser-side JavaScript library providing unified helper functions,
 * default data structures, and storage key constants for all Anaira pages.
 *
 * Usage:
 *   <script src="/scripts/anaira-data-lib.js"></script>
 *
 * WARNING: This is a frontend demo library. Real payment secret keys,
 * authentication tokens, and sensitive credentials must NEVER be stored
 * in frontend code. Production deployments require a secure backend.
 *
 * ============================================================================
 */

/* ─────────────────────────────────────────────────────────────────────────────
 * 1. STORAGE KEY CONSTANTS
 * ───────────────────────────────────────────────────────────────────────────── */

const ANAIRA_KEYS = {
  BOOKINGS:      'anaira_bookings',
  ROOMS:         'anaira_rooms',
  GUESTS:        'anaira_guests',
  PRICING:       'anaira_pricing_settings',
  PAYMENT:       'anaira_payment_settings',
  PAYMENT_LOGS:  'anaira_payment_logs',
  BLOCKED_DATES: 'anaira_blocked_dates',
  SETTINGS:      'anaira_settings'
};

/* ─────────────────────────────────────────────────────────────────────────────
 * 2. DEFAULT ROOM DATA (matches site-content.json)
 * ───────────────────────────────────────────────────────────────────────────── */

const DEFAULT_ROOMS = [
  {
    id: 'balcony',
    name: 'Balcony Room',
    quantity: 6,
    maxGuests: 4,
    amenities: ['AC', 'Android TV', 'Amenities'],
    pricing: {
      weekday: 500000,
      weekend: 700000
    },
    description: 'Comfortable room with private balcony overlooking nature.'
  },
  {
    id: 'porch',
    name: 'Porch Room',
    quantity: 6,
    maxGuests: 4,
    amenities: ['Kipas', 'Android TV', 'Amenities'],
    pricing: {
      weekday: 350000,
      weekend: 420000
    },
    description: 'Cozy room with charming porch area for relaxation.'
  },
  {
    id: 'villa',
    name: 'Villa',
    quantity: 1,
    maxGuests: 20,
    amenities: ['AC', 'Android TV', 'Kitchen', 'Karaoke Set'],
    pricing: {
      weekday: 2100000,
      weekend: 3000000
    },
    description: 'Spacious private villa perfect for group gatherings.'
  }
];

/* ─────────────────────────────────────────────────────────────────────────────
 * 3. DEFAULT PRICING SETTINGS
 * ───────────────────────────────────────────────────────────────────────────── */

const DEFAULT_PRICING = {
  taxPercent:       10,
  servicePercent:   5,
  depositPercent:   50,
  extraGuestFee:    100000,
  earlyCheckinFee:  150000,
  lateCheckoutFee:  150000,
  currency:         'IDR'
};

/* ─────────────────────────────────────────────────────────────────────────────
 * 4. DEFAULT PAYMENT SETTINGS
 *
 * ⚠️ WARNING: Frontend demo only. Real payment secret keys must live on
 * a secure backend server. NEVER expose merchant secrets in client-side code.
 * ───────────────────────────────────────────────────────────────────────────── */

const DEFAULT_PAYMENT = {
  manualQris: {
    enabled: true,
    imagePath: '',
    instruction: 'Scan QR lalu upload bukti transfer'
  },
  bankTransfer: {
    enabled: true,
    bankName: 'BCA',
    accountNumber: '',
    accountHolder: 'Anaira Glamping'
  },
  midtrans: {
    enabled: false,
    environment: 'sandbox',
    clientKey: 'PLACEHOLDER_CLIENT_KEY'
  },
  xendit: {
    enabled: false,
    environment: 'test'
  },
  doku: {
    enabled: false,
    status: 'planned'
  },
  indopay: {
    enabled: false,
    status: 'planned'
  },
  depositRequired: true,
  depositPercent: 50
};

/* ─────────────────────────────────────────────────────────────────────────────
 * 5. DEFAULT OPERATIONAL SETTINGS
 * ───────────────────────────────────────────────────────────────────────────── */

const DEFAULT_SETTINGS = {
  brand: {
    name: 'Anaira Glamping & Resort',
    tagline: 'Stay, Relax & Recharge Near Curug Nangka'
  },
  checkInTime:              '13:00',
  checkOutTime:             '12:00',
  maxAdvanceBookingDays:    365,
  minNightStay:             1,
  cancellationPolicy:       'Cancel DP hangus, bisa reschedule.',
  reschedulePolicy:         'Reschedule H-3 sebelum check-in.',
  sessionTimeoutMinutes:    60,
  authWarning:              'Demo authentication only. Production requires backend auth.'
};

/* ─────────────────────────────────────────────────────────────────────────────
 * 6. HELPER FUNCTIONS
 * ───────────────────────────────────────────────────────────────────────────── */

/**
 * Load data from localStorage, returning a default value if key is absent or invalid.
 * @param {string} key - localStorage key
 * @param {*} defaultValue - Fallback value
 * @returns {*} Parsed data or defaultValue
 */
function loadData(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`[anaira-data-lib] Failed to parse key "${key}":`, e);
    return defaultValue;
  }
}

/**
 * Save data to localStorage as JSON string.
 * @param {string} key - localStorage key
 * @param {*} data - Data to store
 */
function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`[anaira-data-lib] Failed to save key "${key}":`, e);
  }
}

/**
 * Generate a unique booking/record ID with a prefix.
 * Format: PREFIX-YYYY-XXXXX (e.g. ANR-2026-A3F7K)
 * @param {string} [prefix='ANR'] - ID prefix
 * @returns {string} Unique ID
 */
function generateId(prefix = 'ANR') {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${year}-${random}`;
}

/**
 * Format a number as Indonesian Rupiah.
 * @param {number} amount - Amount to format
 * @returns {string} Formatted string, e.g. "Rp 500.000"
 */
function formatIDR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp 0';
  return 'Rp ' + amount.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

/**
 * Calculate the number of nights between two dates.
 * @param {string|Date} checkIn - Check-in date
 * @param {string|Date} checkOut - Check-out date
 * @returns {number} Number of nights (minimum 0)
 */
function calculateNights(checkIn, checkOut) {
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffMs = d2.getTime() - d1.getTime();
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, nights);
}

/**
 * Calculate the total price for a room booking including tax and service.
 * Uses stored pricing settings or defaults.
 * @param {string} roomId - Room type ID ('balcony', 'porch', 'villa')
 * @param {number} nights - Number of nights
 * @param {boolean} [isWeekend=false] - Whether weekend pricing applies
 * @returns {{ baseRate: number, subtotal: number, tax: number, service: number, total: number }}
 */
function calculateTotal(roomId, nights, isWeekend = false) {
  const rooms = loadData(ANAIRA_KEYS.ROOMS, DEFAULT_ROOMS);
  const pricing = loadData(ANAIRA_KEYS.PRICING, DEFAULT_PRICING);

  const room = rooms.find(r => r.id === roomId);
  if (!room) {
    return { baseRate: 0, subtotal: 0, tax: 0, service: 0, total: 0 };
  }

  const baseRate = isWeekend ? room.pricing.weekend : room.pricing.weekday;
  const subtotal = baseRate * nights;
  const tax = Math.round(subtotal * (pricing.taxPercent / 100));
  const service = Math.round(subtotal * (pricing.servicePercent / 100));
  const total = subtotal + tax + service;

  return { baseRate, subtotal, tax, service, total };
}

/**
 * Check if two date ranges overlap.
 * @param {string|Date} newCheckIn
 * @param {string|Date} newCheckOut
 * @param {string|Date} existingCheckIn
 * @param {string|Date} existingCheckOut
 * @returns {boolean} True if the ranges overlap
 */
function isDateOverlap(newCheckIn, newCheckOut, existingCheckIn, existingCheckOut) {
  const a1 = new Date(newCheckIn).getTime();
  const a2 = new Date(newCheckOut).getTime();
  const b1 = new Date(existingCheckIn).getTime();
  const b2 = new Date(existingCheckOut).getTime();
  // Overlap exists when one range starts before the other ends and vice versa
  return a1 < b2 && b1 < a2;
}

/**
 * Validate room availability for a given date range.
 * Checks bookings in localStorage against room unit count.
 * @param {string} roomType - Room type ID
 * @param {string|Date} checkIn - Desired check-in date
 * @param {string|Date} checkOut - Desired check-out date
 * @param {string|null} [excludeBookingId=null] - Booking ID to exclude (for edits)
 * @returns {{ available: boolean, unitsLeft: number, totalUnits: number }}
 */
function validateAvailability(roomType, checkIn, checkOut, excludeBookingId = null) {
  const rooms = loadData(ANAIRA_KEYS.ROOMS, DEFAULT_ROOMS);
  const bookings = loadData(ANAIRA_KEYS.BOOKINGS, []);

  const room = rooms.find(r => r.id === roomType);
  if (!room) {
    return { available: false, unitsLeft: 0, totalUnits: 0 };
  }

  // Count how many bookings overlap with the requested dates
  const overlappingCount = bookings.filter(b => {
    if (excludeBookingId && b.id === excludeBookingId) return false;
    if (b.roomType !== roomType && b.roomId !== roomType) return false;
    if (b.status === 'cancelled' || b.status === 'no-show') return false;
    const bCheckIn = b.checkIn || b.checkInDate;
    const bCheckOut = b.checkOut || b.checkOutDate;
    if (!bCheckIn || !bCheckOut) return false;
    return isDateOverlap(checkIn, checkOut, bCheckIn, bCheckOut);
  }).length;

  const unitsLeft = room.quantity - overlappingCount;
  return {
    available: unitsLeft > 0,
    unitsLeft: Math.max(0, unitsLeft),
    totalUnits: room.quantity
  };
}

/**
 * Normalize a booking object to ensure it has both guest-facing and
 * admin-facing property names for cross-page compatibility.
 * @param {Object} booking - Raw booking object
 * @returns {Object} Normalized booking with canonical + alias properties
 */
function normalizeBooking(booking) {
  if (!booking) return booking;

  const normalized = { ...booking };

  // Ensure canonical properties exist (prefer whichever is set)
  normalized.id            = booking.id || booking.bookingId || generateId('ANR');
  normalized.bookingId     = normalized.id;

  normalized.guestName     = booking.guestName || booking.name || booking.fullName || '';
  normalized.name          = normalized.guestName;
  normalized.fullName      = normalized.guestName;

  normalized.roomType      = booking.roomType || booking.roomId || '';
  normalized.roomId        = normalized.roomType;

  normalized.checkIn       = booking.checkIn || booking.checkInDate || '';
  normalized.checkInDate   = normalized.checkIn;

  normalized.checkOut      = booking.checkOut || booking.checkOutDate || '';
  normalized.checkOutDate  = normalized.checkOut;

  normalized.phone         = booking.phone || booking.phoneNumber || '';
  normalized.phoneNumber   = normalized.phone;

  normalized.email         = booking.email || '';
  normalized.status        = booking.status || 'pending';
  normalized.totalAmount   = booking.totalAmount || booking.total || 0;
  normalized.total         = normalized.totalAmount;
  normalized.notes         = booking.notes || booking.specialRequests || '';
  normalized.specialRequests = normalized.notes;

  normalized.createdAt     = booking.createdAt || new Date().toISOString();
  normalized.updatedAt     = new Date().toISOString();

  return normalized;
}

/**
 * Export bookings array as a CSV file and trigger browser download.
 * @param {Array} bookings - Array of booking objects
 */
function exportBookingsCSV(bookings) {
  if (!bookings || bookings.length === 0) {
    console.warn('[anaira-data-lib] No bookings to export.');
    return;
  }

  const headers = [
    'ID', 'Guest Name', 'Phone', 'Email', 'Room Type',
    'Check-In', 'Check-Out', 'Nights', 'Total', 'Status', 'Notes', 'Created At'
  ];

  const rows = bookings.map(b => {
    const nb = normalizeBooking(b);
    const nights = calculateNights(nb.checkIn, nb.checkOut);
    return [
      nb.id,
      `"${(nb.guestName || '').replace(/"/g, '""')}"`,
      nb.phone,
      nb.email,
      nb.roomType,
      nb.checkIn,
      nb.checkOut,
      nights,
      nb.totalAmount,
      nb.status,
      `"${(nb.notes || '').replace(/"/g, '""')}"`,
      nb.createdAt
    ].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `anaira-bookings-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Backup all Anaira localStorage data as a JSON file and trigger download.
 * @returns {string} JSON string of all backed-up data
 */
function backupAllData() {
  const backup = {};
  Object.entries(ANAIRA_KEYS).forEach(([label, key]) => {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      try {
        backup[key] = JSON.parse(raw);
      } catch {
        backup[key] = raw;
      }
    }
  });

  const jsonString = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `anaira-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return jsonString;
}

/**
 * Restore all Anaira localStorage data from a JSON string.
 * @param {string} jsonString - JSON string previously exported by backupAllData()
 * @returns {{ restored: number, errors: string[] }} Restoration result summary
 */
function restoreAllData(jsonString) {
  const result = { restored: 0, errors: [] };

  try {
    const data = JSON.parse(jsonString);
    const validKeys = new Set(Object.values(ANAIRA_KEYS));

    Object.entries(data).forEach(([key, value]) => {
      if (!validKeys.has(key)) {
        result.errors.push(`Skipped unknown key: ${key}`);
        return;
      }
      try {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
        result.restored++;
      } catch (e) {
        result.errors.push(`Failed to restore "${key}": ${e.message}`);
      }
    });
  } catch (e) {
    result.errors.push(`Invalid JSON: ${e.message}`);
  }

  return result;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * 7. INITIALIZATION — Seed default data if localStorage is empty
 * ───────────────────────────────────────────────────────────────────────────── */

(function initDefaults() {
  if (!loadData(ANAIRA_KEYS.ROOMS, null)) {
    saveData(ANAIRA_KEYS.ROOMS, DEFAULT_ROOMS);
  }
  if (!loadData(ANAIRA_KEYS.PRICING, null)) {
    saveData(ANAIRA_KEYS.PRICING, DEFAULT_PRICING);
  }
  if (!loadData(ANAIRA_KEYS.PAYMENT, null)) {
    saveData(ANAIRA_KEYS.PAYMENT, DEFAULT_PAYMENT);
  }
  if (!loadData(ANAIRA_KEYS.SETTINGS, null)) {
    saveData(ANAIRA_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }
})();

/* ─────────────────────────────────────────────────────────────────────────────
 * 8. EXPORTS (for environments that support modules)
 * ───────────────────────────────────────────────────────────────────────────── */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ANAIRA_KEYS,
    DEFAULT_ROOMS,
    DEFAULT_PRICING,
    DEFAULT_PAYMENT,
    DEFAULT_SETTINGS,
    loadData,
    saveData,
    generateId,
    formatIDR,
    calculateNights,
    calculateTotal,
    isDateOverlap,
    validateAvailability,
    normalizeBooking,
    exportBookingsCSV,
    backupAllData,
    restoreAllData
  };
}
