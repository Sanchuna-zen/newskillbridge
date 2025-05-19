
import { registerUserWithPhone, registerUserWithEmail, signInAsGuest } from '@/actions/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import SubmitButton from '@/components/submit-button'
import Link from 'next/link'

export default function SignUpPage() {
  const [mode, setMode] = useState<'email' | 'phone'>('email')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    if (mode === 'email') {
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const res = await registerUserWithEmail(email, password)
      if (res?.error) setError(res.error)
      else router.replace('/protected')
    } else {
      const phone = formData.get('phone') as string
      const password = formData.get('password') as string
      // Basic phone validation
      if (!/^\+?[1-9]\d{7,14}$/.test(phone)) {
        setError('Please enter a valid phone number with country code.')
        return
      }
      const res = await registerUserWithPhone(phone, password)
      if (res?.error) setError(res.error)
      else router.replace('/protected')
    }
  }

  async function handleGuest() {
    setError(null)
    const res = await signInAsGuest()
    if (res?.error) setError(res.error)
    else router.replace('/protected')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Sign up for your account</h1>
        <div className="flex mb-4 gap-2">
          <button
            type="button"
            className={`px-3 py-1 rounded-lg font-medium border transition-all ${
              mode === 'email'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'
            }`}
            onClick={() => setMode('email')}
          >
            Email
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded-lg font-medium border transition-all ${
              mode === 'phone'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'
            }`}
            onClick={() => setMode('phone')}
          >
            Phone
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'email' ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  autoComplete="email"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Phone (with country code)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  pattern="^\+?[1-9]\d{7,14}$"
                  placeholder="+12345678901"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  autoComplete="tel"
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              autoComplete="new-password"
            />
          </div>
          {error && (
            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-2 rounded text-sm">
              {error}
            </div>
          )}
          <SubmitButton className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 mt-2">
            Sign Up
          </SubmitButton>
        </form>
        <button
          className="w-full mt-4 py-2 rounded-lg border border-yellow-400 bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 font-semibold hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-all"
          onClick={handleGuest}
          type="button"
        >
          Continue as Guest
        </button>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{' '}
          <Link href="/(auth-pages)/sign-in" className="text-blue-600 hover:underline dark:text-blue-400">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}
