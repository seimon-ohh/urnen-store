"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useCountryCode } from "hooks/country-code"

export const HeaderWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const pathName = usePathname()
  const countryCode = useCountryCode()
  const currentPath = countryCode
    ? pathName.split(`/${countryCode}`)[1]
    : pathName
  const isPageWithHeroImage =
    !currentPath ||
    currentPath === "/" ||
    currentPath === "/about" ||
    currentPath.startsWith("/collections")
  const isAboutPage = currentPath === "/about"
  const isAlwaysSticky =
    currentPath.startsWith("/auth") || currentPath.startsWith("/account")

  React.useEffect(() => {
    if (isAlwaysSticky) {
      return
    }

    const headerElement = document.querySelector("#site-header")

    if (!headerElement) {
      return
    }

    const nextElement = headerElement.nextElementSibling
    let triggerPosition = 0

    const updateTriggerPosition = () => {
      if (isPageWithHeroImage) {
        triggerPosition = nextElement
          ? Math.max(nextElement.clientHeight - headerElement.clientHeight, 1)
          : 200
      } else {
        triggerPosition = nextElement
          ? Math.max(
              Number.parseInt(
                window.getComputedStyle(nextElement).paddingTop,
                10
              ) - headerElement.clientHeight,
              1
            )
          : 1
      }
    }

    const handleScroll = () => {
      const position = window.scrollY

      headerElement.setAttribute(
        "data-sticky",
        position > triggerPosition ? "true" : "false"
      )

      // Add blur effect for about page at top position
      if (isAboutPage) {
        headerElement.setAttribute(
          "data-top-blur",
          position < 50 ? "true" : "false"
        )
      }
    }

    updateTriggerPosition()
    handleScroll()

    window.addEventListener("resize", updateTriggerPosition, {
      passive: true,
    })
    window.addEventListener("orientationchange", updateTriggerPosition, {
      passive: true,
    })
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("resize", updateTriggerPosition)
      window.removeEventListener("orientationchange", updateTriggerPosition)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathName, isPageWithHeroImage, isAlwaysSticky, isAboutPage])

  return (
    <div
      id="site-header"
      className="top-0 left-0 w-full max-md:bg-grayscale-50 data-[light=true]:md:text-black data-[sticky=true]:md:bg-white data-[sticky=true]:md:text-black data-[top-blur=true]:backdrop-blur-md data-[top-blur=true]:bg-white/80 data-[top-blur=true]:md:bg-white/80 transition-colors fixed z-40 group"
      data-light={isPageWithHeroImage}
      data-sticky={isAlwaysSticky}
    >
      {children}
    </div>
  )
}
