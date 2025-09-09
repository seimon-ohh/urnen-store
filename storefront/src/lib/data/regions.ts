import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"

export const listRegions = async function () {
  try {
    return await sdk.client
      .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
        method: "GET",
        next: { tags: ["regions"] },
        cache: "force-cache",
      })
      .then(({ regions }) => regions)
  } catch (error) {
    // During build time, the backend might not be available
    // Return a fallback with common country codes
    console.warn("Failed to fetch regions during build, using fallback:", error)
    return [
      {
        id: "reg_01",
        name: "Europe",
        countries: [
          { id: "ctr_01", iso_2: "de", iso_3: "deu", num_code: "276", name: "Germany", display_name: "Germany" },
          { id: "ctr_02", iso_2: "gb", iso_3: "gbr", num_code: "826", name: "United Kingdom", display_name: "United Kingdom" }
        ]
      }
    ] as HttpTypes.StoreRegion[]
  }
}

export const retrieveRegion = async function (id: string) {
  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      next: { tags: [`regions`] },
      cache: "force-cache",
    })
    .then(({ region }) => region)
    .catch(medusaError)
}

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = async function (countryCode: string) {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions()

    if (!regions) {
      return null
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region)
      })
    })

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get("de") // Default to Germany instead of US

    return region
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null
  }
}
