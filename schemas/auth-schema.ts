import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const loginSchemaDefaultValues = { email: "", password: "" } satisfies LoginSchema

export const registerSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const registerSchemaDefaultValues = {
  email: "",
  password: "",
  name: "",
} satisfies RegisterSchema
