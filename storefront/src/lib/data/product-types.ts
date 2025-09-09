import { sdk } from "@lib/config"
import { HttpTypes, PaginatedResponse } from "@medusajs/types"

export const getProductTypesList = async function (
  offset: number = 0,
  limit: number = 100,
  fields?: (keyof HttpTypes.StoreProductType)[]
): Promise<{ productTypes: HttpTypes.StoreProductType[]; count: number }> {
  // Check if we should use fallback data (build time or localhost backend)
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const isLocalhost = backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1")
  const isVercelBuild = process.env.VERCEL === "1" && process.env.NODE_ENV === "production"
  
  if (isLocalhost || isVercelBuild) {
    console.log("Using fallback product types data for build/localhost environment")
    return {
      productTypes: [
        {
          id: "pt_01",
          value: "Handmade Urns",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          metadata: {
            image: {
              url: "/images/content/urne-1.JPG"
            }
          }
        }
      ] as HttpTypes.StoreProductType[],
      count: 1
    }
  }

  try {
    return await sdk.client
      .fetch<
        PaginatedResponse<{
          product_types: HttpTypes.StoreProductType[]
          count: number
        }>
      >("/store/custom/product-types", {
        query: { limit, offset, fields: fields ? fields.join(",") : undefined },
        next: { tags: ["product-types"] },
        cache: "force-cache",
      })
      .then(({ product_types, count }) => ({
        productTypes: product_types,
        count,
      }))
  } catch (error) {
    console.warn("Failed to fetch product types, using fallback:", error)
    return {
      productTypes: [
        {
          id: "pt_01",
          value: "Handmade Urns",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          metadata: {
            image: {
              url: "/images/content/urne-1.JPG"
            }
          }
        }
      ] as HttpTypes.StoreProductType[],
      count: 1
    }
  }
}

export const getProductTypeByHandle = async function (
  handle: string
): Promise<HttpTypes.StoreProductType> {
  // Check if we should use fallback data (build time or localhost backend)
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const isLocalhost = backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1")
  const isVercelBuild = process.env.VERCEL === "1" && process.env.NODE_ENV === "production"
  
  if (isLocalhost || isVercelBuild) {
    console.log("Using fallback product type data for build/localhost environment")
    return {
      id: "pt_01",
      value: "Handmade Urns",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      metadata: {
        image: {
          url: "/images/content/urne-1.JPG"
        }
      }
    } as HttpTypes.StoreProductType
  }

  try {
    return await sdk.client
      .fetch<
        PaginatedResponse<{
          product_types: HttpTypes.StoreProductType[]
          count: number
        }>
      >("/store/custom/product-types", {
        query: { handle, limit: 1 },
        next: { tags: ["product-types"] },
        cache: "force-cache",
      })
      .then(({ product_types }) => product_types[0])
  } catch (error) {
    console.warn("Failed to fetch product type by handle, using fallback:", error)
    return {
      id: "pt_01",
      value: "Handmade Urns",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      metadata: {
        image: {
          url: "/images/content/urne-1.JPG"
        }
      }
    } as HttpTypes.StoreProductType
  }
}
