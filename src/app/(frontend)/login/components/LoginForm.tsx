'use client'

import { useRouter } from 'next/navigation'
import React, { FormEvent, ReactElement, useState } from 'react'
import SubmitButton from '../../(authenticated)/components/SubmitButton'
import { login, LoginResponse } from '../actions/login'

export default function LoginForm(): ReactElement {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result: LoginResponse = await login({ email, password })

    setIsPending(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  return (
    <div className="flex gap-8 min-h-full flex-col justify-center items-center">
      <div className="text-3xl">Login</div>
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="border-1 border-white rounded p-2"
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Password</label>
            <input
              className="border-1 border-white rounded p-2"
              id="password"
              name="password"
              type="password"
            />
          </div>
          <SubmitButton loading={isPending} text="Login" />
        </form>
        {error && <p>An error occurred!</p>}
      </div>
    </div>
  )
}
