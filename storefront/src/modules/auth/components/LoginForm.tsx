"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { SubmitButton } from "@modules/common/components/submit-button"
import { Form, InputField } from "@/components/Forms"
import { LocalizedLink } from "@/components/LocalizedLink"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
import { useLogin } from "hooks/customer"
import { withReactQueryProvider } from "@lib/util/react-query"
import { useRouter } from "next/navigation"
import { emailFormSchema } from "@modules/checkout/components/email"
import { getTranslation } from "@lib/translations"

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const LoginForm = withReactQueryProvider<{
  className?: string
  redirectUrl?: string
  handleCheckout?: (values: z.infer<typeof emailFormSchema>) => void
}>(({ className, redirectUrl, handleCheckout }) => {
  const { countryCode } = useParams()
  const lang = countryCode as string || 'en'
  const { isPending, data, mutate } = useLogin()

  const router = useRouter()

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    mutate(
      { ...values, redirect_url: redirectUrl },
      {
        onSuccess: (res) => {
          if (handleCheckout && res.success) {
            handleCheckout({ email: values.email })
          } else if (res.success) {
            router.push(res.redirectUrl || "/")
          }
        },
      }
    )
  }
  return (
    <Form onSubmit={onSubmit} schema={loginFormSchema}>
      <div className={twMerge("flex flex-col gap-6 md:gap-8", className)}>
        <InputField
          placeholder={getTranslation(lang, 'loginEmailPlaceholder')}
          name="email"
          inputProps={{ autoComplete: "email" }}
          className="flex-1"
        />
        <InputField
          placeholder={getTranslation(lang, 'loginPasswordPlaceholder')}
          name="password"
          type="password"
          className="flex-1"
          inputProps={{ autoComplete: "current-password" }}
        />
        <LocalizedLink
          href="/auth/forgot-password"
          variant="underline"
          className="self-start !pb-0 text-grayscale-500 leading-none"
        >
          {getTranslation(lang, 'loginForgotPassword')}
        </LocalizedLink>
        {!data?.success && (
          <p className="text-red-primary text-sm">{data?.message}</p>
        )}
        <SubmitButton isLoading={isPending}>{getTranslation(lang, 'loginButton')}</SubmitButton>
      </div>
    </Form>
  )
})
