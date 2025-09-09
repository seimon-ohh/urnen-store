import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { getTranslation } from "@lib/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await params
  const lang = countryCode || 'en'
  
  return {
    title: getTranslation(lang, 'storeTitle'),
    description: getTranslation(lang, 'storeDescription'),
  }
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    collection?: string | string[]
    category?: string | string[]
    type?: string | string[]
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage({ searchParams, params }: Params) {
  const { countryCode } = await params
  const { sortBy, page, collection, category, type } = await searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
      collection={
        !collection
          ? undefined
          : Array.isArray(collection)
            ? collection
            : [collection]
      }
      category={
        !category ? undefined : Array.isArray(category) ? category : [category]
      }
      type={!type ? undefined : Array.isArray(type) ? type : [type]}
    />
  )
}
