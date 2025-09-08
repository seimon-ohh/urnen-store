"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/Button"
import { Form, InputField } from "@/components/Forms"
import { LocalizedLink } from "@/components/LocalizedLink"
import { getTranslation } from "@lib/translations"
import { z } from "zod"

const newsletterFormSchema = z.object({
  email: z.string().min(3).email(),
})

export const NewsletterForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { countryCode } = useParams()
  const lang = countryCode as string || 'en'
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  return (
    <div className={className}>
      <h2 className="text-md md:text-lg mb-2 md:mb-1">{getTranslation(lang, 'newsletterTitle')}</h2>
      {isSubmitted ? (
        <p className="max-md:text-xs">
          {getTranslation(lang, 'newsletterThankYou')}
        </p>
      ) : (
        <>
          <p className="max-md:text-xs mb-4">
            {getTranslation(lang, 'newsletterDescription')}
          </p>
          <Form
            onSubmit={() => {
              setIsSubmitted(true)
            }}
            schema={newsletterFormSchema}
          >
            <div className="flex gap-2">
              <InputField
                inputProps={{
                  uiSize: "sm",
                  className: "rounded-xs",
                  autoComplete: "email",
                }}
                name="email"
                type="email"
                placeholder={getTranslation(lang, 'newsletterEmailPlaceholder')}
                className="mb-4 flex-1"
              />
              <Button type="submit" size="sm" className="h-9 text-xs">
                {getTranslation(lang, 'newsletterSubscribe')}
              </Button>
            </div>
          </Form>
          <p className="text-xs text-grayscale-500">
            {getTranslation(lang, 'newsletterConsent')}{" "}
            <LocalizedLink
              href="/privacy-policy"
              variant="underline"
              className="!pb-0"
            >
              {getTranslation(lang, 'privacyPolicy')}
            </LocalizedLink>{" "}
            {getTranslation(lang, 'newsletterConsentEnd')}
          </p>
        </>
      )}
    </div>
  )
}
