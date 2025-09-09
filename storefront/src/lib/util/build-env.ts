/**
 * Utility functions to detect build environments and handle fallbacks
 */

export const shouldUseFallbackData = (): boolean => {
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const isLocalhost = backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1")
  const isVercelBuild = process.env.VERCEL === "1" && process.env.NODE_ENV === "production"
  const isMissingEnvVars = !process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || !process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  
  return isLocalhost || isVercelBuild || isMissingEnvVars
}

export const logFallbackUsage = (dataType: string): void => {
  console.log(`Using fallback ${dataType} data for build/localhost environment`)
}
