import { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"

import { getCustomer } from "@lib/data/customer"
import { SignUpForm } from "@modules/auth/components/SignUpForm"
import { LocalizedLink } from "@/components/LocalizedLink"
import { getTranslation } from "@lib/translations"

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create an account',
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const lang = countryCode || 'en'
  const customer = await getCustomer().catch(() => null)

  if (customer) {
    redirect(`/${(await params).countryCode}/account`)
  }

  return (
    <div className="flex min-h-screen">
      <Image
        src="/images/content/urne-2.JPG"
        width={1440}
        height={1632}
        alt={getTranslation(lang, 'registerImageAlt')}
        className="max-lg:hidden lg:w-1/2 shrink-0 object-cover"
      />
      <div className="shrink-0 max-w-100 lg:max-w-96 w-full mx-auto pt-30 lg:pt-37 pb-16 max-sm:px-4">
        <h1 className="text-xl md:text-2xl mb-10 md:mb-16">
          {getTranslation(lang, 'registerWelcome')}
        </h1>
        <SignUpForm />
        <p className="text-grayscale-500">
          {getTranslation(lang, 'registerAlreadyHaveAccount')}{" "}
          <LocalizedLink
            href="/auth/login"
            variant="underline"
            className="text-black md:pb-0.5"
          >
            {getTranslation(lang, 'registerLogIn')}
          </LocalizedLink>
          .
        </p>
      </div>
    </div>
  )
}
