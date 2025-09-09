import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"

export const listCategories = async function () {
  // Check if we should use fallback data (build time or localhost backend)
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const isLocalhost = backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1")
  const isVercelBuild = process.env.VERCEL === "1" && process.env.NODE_ENV === "production"
  
  if (isLocalhost || isVercelBuild) {
    console.log("Using fallback categories list data for build/localhost environment")
    return [
      {
        id: "cat_01",
        name: "Handmade Urns",
        handle: "handmade-urns",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        rank: 0
      }
    ] as HttpTypes.StoreProductCategory[]
  }

  try {
    return await sdk.client
      .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
        "/store/product-categories",
        {
          query: { fields: "+category_children" },
          next: { tags: ["categories"] },
          cache: "force-cache",
        }
      )
      .then(({ product_categories }) => product_categories)
  } catch (error) {
    console.warn("Failed to fetch categories list, using fallback:", error)
    return [
      {
        id: "cat_01",
        name: "Handmade Urns",
        handle: "handmade-urns",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        rank: 0
      }
    ] as HttpTypes.StoreProductCategory[]
  }
}

export const getCategoriesList = async function (
  offset: number = 0,
  limit: number = 100,
  fields?: (keyof HttpTypes.StoreProductCategory)[]
) {
  // Check if we should use fallback data (build time or localhost backend)
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const isLocalhost = backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1")
  const isVercelBuild = process.env.VERCEL === "1" && process.env.NODE_ENV === "production"
  
  if (isLocalhost || isVercelBuild) {
    console.log("Using fallback categories data for build/localhost environment")
    return {
      product_categories: [
        {
          id: "cat_01",
          name: "Handmade Urns",
          handle: "handmade-urns",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          rank: 0
        }
      ] as HttpTypes.StoreProductCategory[]
    }
  }

  try {
    return await sdk.client.fetch<{
      product_categories: HttpTypes.StoreProductCategory[]
    }>("/store/product-categories", {
      query: {
        limit,
        offset,
        fields: fields ? fields.join(",") : undefined,
      },
      next: { tags: ["categories"] },
      cache: "force-cache",
    })
  } catch (error) {
    console.warn("Failed to fetch categories, using fallback:", error)
    return {
      product_categories: [
        {
          id: "cat_01",
          name: "Handmade Urns",
          handle: "handmade-urns",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          rank: 0
        }
      ] as HttpTypes.StoreProductCategory[]
    }
  }
}

export const getCategoryByHandle = async function (categoryHandle: string[]) {
  // Check if we should use fallback data (build time or localhost backend)
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const isLocalhost = backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1")
  const isVercelBuild = process.env.VERCEL === "1" && process.env.NODE_ENV === "production"
  
  if (isLocalhost || isVercelBuild) {
    console.log("Using fallback category by handle data for build/localhost environment")
    return {
      product_categories: [
        {
          id: "cat_01",
          name: "Handmade Urns",
          handle: "handmade-urns",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          rank: 0
        }
      ] as HttpTypes.StoreProductCategory[]
    } as HttpTypes.StoreProductCategoryListResponse
  }

  try {
    return await sdk.client.fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: { handle: categoryHandle },
        next: { tags: ["categories"] },
        cache: "force-cache",
      }
    )
  } catch (error) {
    console.warn("Failed to fetch category by handle, using fallback:", error)
    return {
      product_categories: [
        {
          id: "cat_01",
          name: "Handmade Urns",
          handle: "handmade-urns",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          rank: 0
        }
      ] as HttpTypes.StoreProductCategory[]
    } as HttpTypes.StoreProductCategoryListResponse
  }
}
