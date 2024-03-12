import { UserRole } from "@prisma/client"
import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.string().optional(),
})

export type LoginSchema = z.infer<typeof LoginSchema>

export const loginSchemaDefaultValues = { email: "", password: "", code: "" } satisfies LoginSchema

export const RegisterSchema = z.strictObject({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(3, { message: "Name is required" }),
})

export type RegisterSchema = z.infer<typeof RegisterSchema>

export const registerSchemaDefaultValues = {
  email: "",
  password: "",
  name: "",
} satisfies RegisterSchema

export const ResetSchema = z.strictObject({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
})

export type ResetSchema = z.infer<typeof ResetSchema>

export const resetDefault = { email: "" } satisfies ResetSchema

export const NewPasswordSchema = z.strictObject({
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
})
export type NewPasswordSchema = z.infer<typeof NewPasswordSchema>

export const newPasswordDefault = { password: "" } satisfies NewPasswordSchema

export const SettingsSchema = z
  .strictObject({
    name: z.string().min(3, { message: "Minimum 3 characters required" }).or(z.literal(undefined)),
    isTwoFactorEnabled: z.boolean().or(z.literal(undefined)),
    role: z.enum([UserRole.ADMIN, UserRole.USER]).or(z.literal(undefined)),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid Email" })
      .or(z.literal(undefined)),
    password: z
      .string()
      .min(6, { message: "Minimum 6 characters required" })
      .or(z.literal(undefined)),
    newPassword: z
      .string()
      .min(6, { message: "Minimum 6 characters required" })
      .or(z.literal(undefined)),
  })
  .refine(
    data => {
      if (data.password && !data.newPassword) return false
      return true
    },
    { message: "new password is required", path: ["newPassword"] }
  )
  .refine(
    data => {
      if (data.newPassword && !data.password) return false
      return true
    },
    { message: "password is required", path: ["password"] }
  )
export type SettingsSchema = z.infer<typeof SettingsSchema>
