import { Auth } from '@polybase/auth'

export const auth = typeof window !== "undefined" ? new Auth() : null;