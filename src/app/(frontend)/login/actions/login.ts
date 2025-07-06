'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
//import type { Payload } from 'payload'
import { Custumer } from '@/payload-types'

interface LoginParams {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  error?: string
}

export type Result = {
  exp?: number
  token?: string
  user?: Custumer
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
  const payload = await getPayload({ config })
  try {
    const result: Result = await payload.login({
      collection: 'custumers',
      data: { email, password },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })
    } else {
      return { success: false, error: 'Invalid email or password' }
    }

    return { success: true }
  } catch (error) {
    console.error('Login error', error)
    return { success: false, error: 'An errror occurred' }
  }
}
