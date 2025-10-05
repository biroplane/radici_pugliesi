export function formatMoney(amount: number) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}
export function formatDate(date: string) {
  const d = new Date(date)
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
  }).format(d)
}
export function formatDateParts(date: string) {
  const d = new Date(date)
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'short',
  }).formatToParts(d)
}
