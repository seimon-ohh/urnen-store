import { sdk } from "@lib/config"
import { getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export const retrieveCollection = async function (id: string) {
  return sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(
      `/store/collections/${id}`,
      {
        next: { tags: ["collections"] },
        cache: "force-cache",
      }
    )
    .then(({ collection }) => collection)
}

export const getCollectionsList = async function (
  offset: number = 0,
  limit: number = 100,
  fields?: (keyof HttpTypes.StoreCollection)[]
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> {
  // Check if we should use fallback data (build time or localhost backend)
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const isLocalhost = backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1")
  const isVercelBuild = process.env.VERCEL === "1" && process.env.NODE_ENV === "production"
  
  if (isLocalhost || isVercelBuild) {
    console.log("Using fallback collections data for build/localhost environment")
    return {
      collections: [
        {
          id: "col_01",
          title: "Handmade Urns",
          handle: "handmade-urns",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          metadata: {}
        }
      ] as HttpTypes.StoreCollection[],
      count: 1
    }
  }

  try {
    return await sdk.client
      .fetch<{
        collections: HttpTypes.StoreCollection[]
        count: number
      }>("/store/collections", {
        query: { limit, offset, fields: fields ? fields.join(",") : undefined },
        next: { tags: ["collections"] },
        cache: "force-cache",
      })
      .then(({ collections }) => ({ collections, count: collections.length }))
  } catch (error) {
    console.warn("Failed to fetch collections, using fallback:", error)
    return {
      collections: [
        {
          id: "col_01",
          title: "Handmade Urns",
          handle: "handmade-urns",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          metadata: {}
        }
      ] as HttpTypes.StoreCollection[],
      count: 1
    }
  }
}

export const getCollectionByHandle = async function (
  handle: string,
  fields?: (keyof HttpTypes.StoreCollection)[]
): Promise<HttpTypes.StoreCollection> {
  // Check if we should use fallback data (build time or localhost backend)
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const isLocalhost = backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1")
  const isVercelBuild = process.env.VERCEL === "1" && process.env.NODE_ENV === "production"
  
  if (isLocalhost || isVercelBuild) {
    console.log("Using fallback collection data for build/localhost environment")
    return {
      id: "col_01",
      title: "Handmade Urns",
      handle: "handmade-urns",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      metadata: {}
    } as HttpTypes.StoreCollection
  }

  try {
    return await sdk.client
      .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
        query: {
          handle,
          fields: fields ? fields.join(",") : undefined,
          limit: 1,
        },
        next: { tags: ["collections"] },
        cache: "force-cache",
      })
      .then(({ collections }) => collections[0])
  } catch (error) {
    console.warn("Failed to fetch collection by handle, using fallback:", error)
    return {
      id: "col_01",
      title: "Handmade Urns",
      handle: "handmade-urns",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      metadata: {}
    } as HttpTypes.StoreCollection
  }
}

export const getCollectionsWithProducts = async (
  countryCode: string
): Promise<HttpTypes.StoreCollection[] | null> => {
  const { collections } = await getCollectionsList(0, 3)

  if (!collections) {
    return null
  }

  const collectionIds = collections
    .map((collection) => collection.id)
    .filter(Boolean) as string[]

  const { response } = await getProductsList({
    queryParams: { collection_id: collectionIds },
    countryCode,
  })

  response.products.forEach((product) => {
    const collection = collections.find(
      (collection) => collection.id === product.collection_id
    )

    if (collection) {
      if (!collection.products) {
        collection.products = []
      }

      collection.products.push(product)
    }
  })

  return collections as unknown as HttpTypes.StoreCollection[]
}
