"use client"

import * as React from "react"
import Image from "next/image"
import { getTranslation } from "@lib/translations"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedLink } from "@/components/LocalizedLink"

interface InspirationPageClientProps {
  countryCode: string
}

export const InspirationPageClient: React.FC<InspirationPageClientProps> = ({ countryCode }) => {
  const lang = countryCode || 'en'
  
  return (
    <>
      <div className="max-md:pt-18">
        <Image
          src="/images/content/urne-3.JPG"
          width={2880}
          height={1500}
          alt={getTranslation(lang, 'inspirationImageAlt')}
          className="md:h-screen md:object-cover mb-8 md:mb-26"
        />
      </div>
      <div className="pb-26 md:pb-36">
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-md mb-6 md:mb-16 md:text-2xl">
              {getTranslation(lang, 'inspirationHeadline')}
            </h3>
            <div className="md:text-md max-md:mb-16 max-w-135">
              <p>
                {getTranslation(lang, 'inspirationText1')}
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, md: 9 }} end={13}>
            <LocalizedLink href="/store">
              <Image
                src="/images/content/urne-4.JPG"
                width={768}
                height={572}
                alt="Urn detail"
                className="mb-4 md:mb-6"
              />
              <div className="flex justify-between">
                <div>
                  <p className="mb-1">Studio detail</p>
                  <p className="text-grayscale-500 text-xs">Material study</p>
                </div>
                <div>
                  <p className="font-semibold">View</p>
                </div>
              </div>
            </LocalizedLink>
          </LayoutColumn>
          <LayoutColumn>
            <Image
              src="/images/content/DSCF3614.JPG"
              width={2496}
              height={1404}
              alt="Living room with brown armchair and gray corner sofa"
              className="mt-26 md:mt-36 mb-8 md:mb-26"
            />
          </LayoutColumn>
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-md mb-6 md:mb-16 md:text-2xl">
              {getTranslation(lang, 'inspirationText2')}
            </h3>
            <div className="md:text-md max-md:mb-16 max-w-135">
              <p>
                {getTranslation(lang, 'inspirationText3')}
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, md: 9 }} end={13}>
            <LocalizedLink
              href="/store"
              className="mb-8 md:mb-16 inline-block"
            >
              <Image
                src="/images/content/urne-1.JPG"
                width={768}
                height={572}
                alt="Urn silhouette"
                className="mb-4 md:mb-6"
              />
              <div className="flex justify-between">
                <div>
                  <p className="mb-1">Silhouette</p>
                  <p className="text-grayscale-500 text-xs">Quiet form</p>
                </div>
                <div>
                  <p className="font-semibold">View</p>
                </div>
              </div>
            </LocalizedLink>
            <LocalizedLink href="/store">
              <Image
                src="/images/content/urne-2.JPG"
                width={768}
                height={572}
                alt="Urn close-up"
                className="mb-4 md:mb-6"
              />
              <div className="flex justify-between">
                <div>
                  <p className="mb-1">Close-up</p>
                  <p className="text-grayscale-500 text-xs">Paper yarn</p>
                </div>
                <div>
                  <p className="font-semibold">View</p>
                </div>
              </div>
            </LocalizedLink>
          </LayoutColumn>
        </Layout>
        <Image
          src="/images/content/urne-3.JPG"
          width={2880}
          height={1618}
          alt="Living room with gray two-seater puffy sofa"
          className="md:h-screen md:object-cover mt-26 md:mt-36 mb-8 md:mb-26"
        />
        <Layout>
          <LayoutColumn start={1} end={{ base: 13, md: 8 }}>
            <h3 className="text-md mb-6 md:mb-16 md:text-2xl">
              Modulated light, layered stitch, and measured rhythm.
            </h3>
            <div className="md:text-md max-md:mb-16 max-w-135">
              <p>
                Whether you&apos;re looking for bold statement pieces or subtle
                elegance, this collection elevates your home with a touch of
                glamour, sophistication, and unmatched coziness.
              </p>
            </div>
          </LayoutColumn>
          <LayoutColumn start={{ base: 1, md: 9 }} end={13}>
            <LocalizedLink href="/store">
              <Image
                src="/images/content/urne-4.JPG"
                width={768}
                height={572}
                alt="Studio view"
                className="mb-4 md:mb-6"
              />
              <div className="flex justify-between">
                <div>
                  <p className="mb-1">Studio</p>
                  <p className="text-grayscale-500 text-xs">Process</p>
                </div>
                <div>
                  <p className="font-semibold">View</p>
                </div>
              </div>
            </LocalizedLink>
          </LayoutColumn>
        </Layout>
      </div>
    </>
  )
}
