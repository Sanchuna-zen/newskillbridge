
"use server"

import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Email registration
export async function registerUserWithEmail(email: string, password: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: cookieStore.get, set: cookieStore.set, remove: cookieStore.delete } }
  )
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) return { error: error.message }
  // Optionally: redirect('/protected')
  return { user: data.user }
}

// Phone-based registration
export async function registerUserWithPhone(phone: string, password: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: cookieStore.get, set: cookieStore.set, remove: cookieStore.delete } }
  )
  const { data, error } = await supabase.auth.signUp({
    phone,
    password,
  })
  if (error) return { error: error.message }
  return { user: data.user }
}

// Guest access (anonymous sign-in)
// Since Supabase doesn't support true "anonymous", we emulate with a demo "guest" account.
export async function signInAsGuest() {
  // Demo guest credentials (ensure this account exists in your Supabase Auth!)
  const GUEST_EMAIL = "guest@demo.com"
  const GUEST_PASSWORD = "guest-access"
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: cookieStore.get, set: cookieStore.set, remove: cookieStore.delete } }
  )
  const { data, error } = await supabase.auth.signInWithPassword({
    email: GUEST_EMAIL,
    password: GUEST_PASSWORD,
  })
  if (error) return { error: error.message }
  return { user: data.user }
}
