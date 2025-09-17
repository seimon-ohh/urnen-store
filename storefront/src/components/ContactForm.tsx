"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/Button"
import { Form, InputField } from "@/components/Forms"
import { LocalizedLink } from "@/components/LocalizedLink"
import { getTranslation } from "@lib/translations"
import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(3).email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export const ContactForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { countryCode } = useParams()
  const lang = countryCode as string || 'en'
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true)
    
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(data.subject)
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      )
      const mailtoLink = `mailto:info@donata-oppermann-urns.com?subject=${subject}&body=${body}`
      
      // Open default email client
      window.open(mailtoLink, '_blank')
      
      // Show success message
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error opening email client:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <h2 className="text-sm md:text-md mb-1">{getTranslation(lang, 'contactTitle')}</h2>
      {isSubmitted ? (
        <p className="text-xs">
          {getTranslation(lang, 'contactThankYou')}
        </p>
      ) : (
        <>
          <p className="text-xs mb-3">
            {getTranslation(lang, 'contactDescription')}
          </p>
          <Form
            onSubmit={handleSubmit}
            schema={contactFormSchema}
          >
            <div className="space-y-2">
              <div className="flex gap-2">
                <InputField
                  inputProps={{
                    uiSize: "sm",
                    className: "rounded-xs",
                    autoComplete: "name",
                  }}
                  name="name"
                  type="text"
                  placeholder={getTranslation(lang, 'contactNamePlaceholder')}
                  className="flex-1"
                />
                <InputField
                  inputProps={{
                    uiSize: "sm",
                    className: "rounded-xs",
                    autoComplete: "email",
                  }}
                  name="email"
                  type="email"
                  placeholder={getTranslation(lang, 'contactEmailPlaceholder')}
                  className="flex-1"
                />
              </div>
              <InputField
                inputProps={{
                  uiSize: "sm",
                  className: "rounded-xs",
                }}
                name="subject"
                type="text"
                placeholder={getTranslation(lang, 'contactSubjectPlaceholder')}
                className="w-full"
              />
              <textarea
                name="message"
                placeholder={getTranslation(lang, 'contactMessagePlaceholder')}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="w-full h-8 text-xs"
                disabled={isSubmitting}
              >
                {isSubmitting ? getTranslation(lang, 'contactSending') : getTranslation(lang, 'contactSend')}
              </Button>
            </div>
          </Form>
          <p className="text-xs text-grayscale-500 mt-1">
            {getTranslation(lang, 'contactConsent')}{" "}
            <LocalizedLink
              href="/privacy-policy"
              variant="underline"
              className="!pb-0"
            >
              {getTranslation(lang, 'privacyPolicy')}
            </LocalizedLink>{" "}
            {getTranslation(lang, 'contactConsentEnd')}
          </p>
        </>
      )}
    </div>
  )
}
