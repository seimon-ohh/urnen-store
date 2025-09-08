"use client"

import * as React from "react"
import { useCountryCode } from "hooks/country-code"
import { getTranslation } from "@lib/translations"
import { LocalizedLink } from "@/components/LocalizedLink"

interface HeaderClientProps {
  countryOptions: {
    country: string | undefined
    region: string
    label: string | undefined
  }[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ countryOptions }) => {
  const countryCode = useCountryCode(countryOptions)
  
  return (
    <>
      <h1 className="font-medium text-md">
        <LocalizedLink href="/">{getTranslation(countryCode || 'en', 'brandName')}</LocalizedLink>
      </h1>
      <div className="flex items-center gap-8 max-md:hidden">
        <LocalizedLink href="/about">{getTranslation(countryCode || 'en', 'about')}</LocalizedLink>
        <LocalizedLink href="/inspiration">{getTranslation(countryCode || 'en', 'inspiration')}</LocalizedLink>
        <LocalizedLink href="/store">{getTranslation(countryCode || 'en', 'shop')}</LocalizedLink>
      </div>
    </>
  )
}
