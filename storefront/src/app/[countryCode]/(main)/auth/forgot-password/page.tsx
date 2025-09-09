import { Metadata } from "next"
import Image from "next/image"
import { ForgotPasswordForm } from "@modules/auth/components/ForgotPasswordForm"
import { getTranslation } from "@lib/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await params
  const lang = countryCode || 'en'
  
  return {
    title: getTranslation(lang, 'forgotPasswordTitle'),
    description: getTranslation(lang, 'forgotPasswordDescription'),
  }
}

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const lang = countryCode || 'en'
  
  return (
    <div className="flex min-h-screen">
      <Image
        src="/images/content/urne-4.JPG"
        width={1440}
        height={1632}
        alt={getTranslation(lang, 'forgotPasswordImageAlt')}
        className="max-lg:hidden lg:w-1/2 shrink-0 object-cover"
      />
      <div className="shrink-0 max-w-100 lg:max-w-96 w-full mx-auto pt-30 lg:pt-37 pb-16 max-sm:px-4">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
