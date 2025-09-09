import { Metadata } from "next"
import { StoreRegion } from "@medusajs/types"
import { listRegions } from "@lib/data/regions"
import { InspirationPageClient } from "@/components/InspirationPageClient"
import { CollectionsSection } from "@/components/CollectionsSection"
import { getTranslation } from "@lib/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await params
  const lang = countryCode || 'en'
  
  return {
    title: getTranslation(lang, 'inspirationTitle'),
    description: getTranslation(lang, 'inspirationDescription'),
  }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions.flatMap((r) =>
      r.countries
        ? r.countries
            .map((c) => c.iso_2)
            .filter(
              (value): value is string =>
                typeof value === "string" && Boolean(value)
            )
        : []
    )
  )

  const staticParams = countryCodes.map((countryCode) => ({
    countryCode,
  }))

  return staticParams
}

export default async function InspirationPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  
  return (
    <>
      <InspirationPageClient countryCode={countryCode} />
      <CollectionsSection className="mt-26 md:mt-36" countryCode={countryCode} />
    </>
  )
}
