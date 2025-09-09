export const getBaseURL = () => {
  // Use Vercel URL if available, otherwise fallback to localhost for development
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
}
