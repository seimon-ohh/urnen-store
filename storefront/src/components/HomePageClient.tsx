"use client"

import * as React from "react"
import Image from "next/image"
import { getTranslation } from "@lib/translations"
import { LocalizedLink } from "@/components/LocalizedLink"
import { Layout, LayoutColumn } from "@/components/Layout"

interface HomePageClientProps {
  countryCode: string
}

export const HomePageClient: React.FC<HomePageClientProps> = ({ countryCode }) => {
  const lang = countryCode || 'en'
  
  return (
    <>
      <div className="max-md:pt-18">
        <Image
          src="/images/content/hero-urne.jpg"
          width={2880}
          height={1500}
          alt={getTranslation(lang, 'heroAlt')}
          className="md:h-screen md:object-cover"
        />
      </div>
      <div className="pt-8 pb-26 md:pt-26 md:pb-36">
        <Layout className="mb-26 md:mb-36">
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-md max-md:mb-6 md:text-2xl">
              {getTranslation(lang, 'heroHeadline')}
            </h3>
            <p className="text-sm md:text-md mt-4 max-w-2xl">
              {getTranslation(lang, 'heroIntroText')}
            </p>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, md: 9 }} end={13}>
            <div className="flex items-center h-full">
              <div className="md:text-md">
                <LocalizedLink href="/store" variant="underline">
                  {getTranslation(lang, 'aboutSectionCta')}
                </LocalizedLink>
              </div>
            </div>
          </LayoutColumn>
        </Layout>
        
        <Layout>
          <LayoutColumn className="col-span-full">
            <h3 className="text-md md:text-2xl mb-8 md:mb-16">
              {getTranslation(lang, 'aboutSectionTitle')}
            </h3>
            <Image
              src="/images/content/DSCF3621.JPG"
              width={2496}
              height={1400}
              alt={getTranslation(lang, 'aboutImageAlt')}
              className="mb-8 md:mb-16 max-md:aspect-[3/2] max-md:object-cover"
            />
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, md: 7 }}>
            <h2 className="text-md md:text-2xl">
              {getTranslation(lang, 'heroSubheadline')}
            </h2>
          </LayoutColumn>
          <LayoutColumn
            start={{ base: 1, md: 8 }}
            end={13}
            className="mt-6 md:mt-19"
          >
            <div className="md:text-md">
              <p className="mb-5 md:mb-9">
                {getTranslation(lang, 'aboutSectionText')}
              </p>
              <LocalizedLink href="/about" variant="underline">
                {getTranslation(lang, 'aboutSectionCta')}
              </LocalizedLink>
            </div>
          </LayoutColumn>
        </Layout>
      </div>
    </>
  )
}
