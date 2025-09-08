"use client"

import { useParams, usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { Layout, LayoutColumn } from "@/components/Layout"
import { NewsletterForm } from "@/components/NewsletterForm"
import { LocalizedLink } from "@/components/LocalizedLink"
import { getTranslation } from "@lib/translations"

export const Footer: React.FC = () => {
  const pathName = usePathname()
  const { countryCode } = useParams()
  const currentPath = pathName.split(`/${countryCode}`)[1]
  const lang = countryCode as string || 'en'

  const isAuthPage = currentPath === "/register" || currentPath === "/login"

  return (
    <div
      className={twMerge(
        "bg-grayscale-50 py-8 md:py-20",
        isAuthPage && "hidden"
      )}
    >
      <Layout>
        <LayoutColumn className="col-span-13">
          <div className="flex max-lg:flex-col justify-between md:gap-20 max-md:px-4">
            <div className="flex flex-1 max-lg:w-full max-lg:order-2 max-sm:flex-col justify-between sm:gap-30 lg:gap-20 md:items-center">
              <div className="max-w-35 md:flex-1 max-md:mb-9">
                <h1 className="text-lg md:text-xl mb-2 md:mb-6 leading-none md:leading-[0.9]">
                  {getTranslation(lang, 'brandName')}
                </h1>
                <p className="text-xs">
                  &copy; {new Date().getFullYear()}, {getTranslation(lang, 'copyright')}
                </p>
              </div>
              <div className="flex gap-10 xl:gap-18 max-md:text-xs flex-1 justify-between lg:justify-center">
                <ul className="flex flex-col gap-6 md:gap-3.5">
                  <li>
                    <LocalizedLink href="/">{getTranslation(lang, 'faq')}</LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/">{getTranslation(lang, 'help')}</LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/">{getTranslation(lang, 'delivery')}</LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/">{getTranslation(lang, 'returns')}</LocalizedLink>
                  </li>
                </ul>
                <ul className="flex flex-col gap-6 md:gap-3.5">
                  <li>
                    <a
                      href="https://www.instagram.com/agiloltd/"
                      target="_blank"
                    >
                      {getTranslation(lang, 'instagram')}
                    </a>
                  </li>
                  <li>
                    <a href="https://tiktok.com" target="_blank">
                      {getTranslation(lang, 'tiktok')}
                    </a>
                  </li>
                  <li>
                    <a href="https://pinterest.com" target="_blank">
                      {getTranslation(lang, 'pinterest')}
                    </a>
                  </li>
                  <li>
                    <a href="https://facebook.com" target="_blank">
                      {getTranslation(lang, 'facebook')}
                    </a>
                  </li>
                </ul>
                <ul className="flex flex-col gap-6 md:gap-3.5">
                  <li>
                    <LocalizedLink href="/privacy-policy">
                      {getTranslation(lang, 'privacyPolicy')}
                    </LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/cookie-policy">
                      {getTranslation(lang, 'cookiePolicy')}
                    </LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink href="/terms-of-use">
                      {getTranslation(lang, 'termsOfUse')}
                    </LocalizedLink>
                  </li>
                </ul>
              </div>
            </div>

            <NewsletterForm className="flex-1 max-lg:w-full lg:max-w-90 xl:max-w-96 max-lg:order-1 max-md:mb-16" />
          </div>
        </LayoutColumn>
      </Layout>
    </div>
  )
}
