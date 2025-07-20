// Number formatting utilities
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Count display formatting with proper pluralization
export const formatCount = (count: number, singular: string, plural?: string): string => {
  const pluralForm = plural || singular + 's'
  return `${formatNumber(count)} ${count === 1 ? singular : pluralForm}`
}

// Subscriber count specific formatting
export const formatSubscriberCount = (count: number): string => {
  return formatCount(count, 'subscriber')
}

// Text pluralization helper
export const pluralize = (count: number, singular: string, plural?: string): string => {
  const pluralForm = plural || singular + 's'
  return count === 1 ? singular : pluralForm
}

// Format subscriber message
export const formatSubscriberMessage = (count: number): string => {
  const formattedCount = formatNumber(count)
  return `Join ${formattedCount} ambitious builders who've already signed up`
}

// Format large numbers with commas
export const formatWithCommas = (num: number): string => {
  return num.toLocaleString()
}

// Format percentage
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`
}

// Format currency
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
} 