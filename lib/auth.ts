import { session } from "@/auth"

export const auth = async () => (await session())?.user
