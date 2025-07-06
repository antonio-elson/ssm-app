'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import configPromisse from '@payload-config'
import type { Payload } from 'payload'
import { Custumer } from '@/payload-types'

export async function getUser(): Promise<Custumer | null> {
  const headers = await getHeaders()
  const payload: Payload = await getPayload({ config: await configPromisse })
  const { user } = await payload.auth({ headers })
  return user || null
}
