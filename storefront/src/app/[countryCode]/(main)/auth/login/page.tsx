import { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"

import { getCustomer } from "@lib/data/customer"
import { LoginForm } from "@modules/auth/components/LoginForm"
import { LocalizedLink } from "@/components/LocalizedLink"
import { getTranslation } from "@lib/translations"

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const lang = countryCode || 'en'
  const customer = await getCustomer().catch(() => null)

  if (customer) {
    redirect(`/${countryCode}/account`)
  }

  return (
    <div className="flex min-h-screen">
      <Image
        src="/images/content/DSCF3609.JPG"
        width={1440}
        height={1632}
        alt={getTranslation(lang, 'loginImageAlt')}
        className="max-lg:hidden lg:w-1/2 shrink-0 object-cover"
      />
      <div className="shrink-0 max-w-100 lg:max-w-96 w-full mx-auto pt-30 lg:pt-37 pb-16 max-sm:px-4">
        <h1 className="text-xl md:text-2xl mb-10 md:mb-16">
          {getTranslation(lang, 'loginWelcome')}
        </h1>
        <LoginForm
          className="mb-10 md:mb-15"
          redirectUrl={`/${countryCode}/account`}
        />
        <p className="text-grayscale-500">
          {getTranslation(lang, 'loginNoAccount')}{" "}
          <LocalizedLink
            href="/auth/register"
            variant="underline"
            className="text-black md:pb-0.5"
          >
            {getTranslation(lang, 'loginRegisterHere')}
          </LocalizedLink>
          .
        </p>
      </div>
    </div>
  )
}
