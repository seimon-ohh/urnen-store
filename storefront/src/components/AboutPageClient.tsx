"use client"

import * as React from "react"
import Image from "next/image"
import { getTranslation } from "@lib/translations"
import { Layout, LayoutColumn } from "@/components/Layout"

interface AboutPageClientProps {
  countryCode: string
}

export const AboutPageClient: React.FC<AboutPageClientProps> = ({ countryCode }) => {
  const lang = countryCode || 'en'
  
  return (
    <>
      <div className="max-md:pt-18">
        <Image
          src="/images/content/2.jpg"
          width={2880}
          height={1500}
          alt={getTranslation(lang, 'aboutImageAlt')}
          className="md:h-screen md:object-cover"
        />
      </div>
      <div className="pt-8 md:pt-26 pb-26 md:pb-36">
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, lg: 7 }}>
            <h3 className="text-md max-lg:mb-6 md:text-2xl">
              {getTranslation(lang, 'aboutHeadline')}
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-md lg:mt-18">
              <p className="mb-5 lg:mb-9">
                {getTranslation(lang, 'aboutText1')}
              </p>
              <p>
                {getTranslation(lang, 'aboutText2')}
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn>
            <Image
              src="/images/content/DSCF3614.JPG"
              width={2496}
              height={1404}
              alt={getTranslation(lang, 'aboutImageAlt2')}
              className="mt-26 lg:mt-36 mb-8 lg:mb-26"
            />
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, lg: 8 }}>
            <h3 className="text-md lg:mb-10 mb-6 md:text-2xl">
              {getTranslation(lang, 'aboutText3')}
            </h3>
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, lg: 6 }}>
            <div className="mb-16 lg:mb-26">
              <p className="mb-5 md:mb-9">
                {getTranslation(lang, 'aboutText4')}
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn start={{ base: 2, lg: 1 }} end={{ base: 12, lg: 7 }}>
            <Image
              src="/images/content/DSCF3617.JPG"
              width={1200}
              height={1600}
              alt={getTranslation(lang, 'aboutImageAlt3')}
              className="mb-16 lg:mb-46"
            />
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="mb-6 lg:mb-20 xl:mb-36">
              <p>
                {getTranslation(lang, 'aboutText4')}
              </p>
            </div>
          </LayoutColumn>
        </Layout>
        <Image
          src="/images/content/DSCF3583.JPG"
          width={2880}
          height={1618}
          alt={getTranslation(lang, 'aboutImageAlt4')}
          className="mb-8 lg:mb-26"
        />
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, lg: 7 }}>
            <h3 className="text-md max-lg:mb-6 md:text-2xl">
              {getTranslation(lang, 'aboutMadeInGermany')}
            </h3>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, lg: 8 }} end={13}>
            <div className="md:text-md lg:mt-18">
              <p className="mb-5 lg:mb-9">
                {getTranslation(lang, 'aboutBespokeText')}
              </p>
              <p>
                {getTranslation(lang, 'aboutInquiriesText')}
              </p>
            </div>
          </LayoutColumn>
        </Layout>
      </div>
    </>
  )
}
