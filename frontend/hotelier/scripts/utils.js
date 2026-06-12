/**
 * Rincian fungsi utilitas bersama untuk proyek Anaira Glamping
 */

/**
 * Format angka ke mata uang Rupiah
 * @param {number} amount 
 * @returns {string}
 */
export function formatRupiah(amount) {
  if (isNaN(amount) || amount === null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace("Rp", "Rp ");
}

/**
 * Format tanggal ke format Indonesia (dd MMMM yyyy)
 * @param {string|Date} dateInput 
 * @returns {string}
 */
export function formatIndoDate(dateInput) {
  if (!dateInput) return '-';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '-';
  
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

/**
 * Handler umum untuk kesalahan fetch
 * @param {Error} error 
 */
export function handleFetchError(error) {
  console.error('Fetch Error:', error);
  alert('Terjadi kesalahan koneksi atau server. Silakan coba lagi nanti.');
}
