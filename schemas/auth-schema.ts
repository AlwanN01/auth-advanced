import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.string().optional(),
})

export type LoginSchema = z.infer<typeof LoginSchema>

export const loginSchemaDefaultValues = { email: "", password: "", code: "" } satisfies LoginSchema

export const RegisterSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
})

export type RegisterSchema = z.infer<typeof RegisterSchema>

export const registerSchemaDefaultValues = {
  email: "",
  password: "",
  name: "",
} satisfies RegisterSchema

export const ResetSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
})

export type ResetSchema = z.infer<typeof ResetSchema>

export const resetDefault = { email: "" } satisfies ResetSchema

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
})
export type NewPasswordSchema = z.infer<typeof NewPasswordSchema>

export const newPasswordDefault = { password: "" } satisfies NewPasswordSchema
