import { Resend } from "resend"

import { tokenParam } from "@/common"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?${tokenParam}=${token}`

  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?${tokenParam}=${token}`

  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two factor authentication code",
    html: `<p>Your two factor authentication code is <strong>${token}</strong></p>`,
  })
}
