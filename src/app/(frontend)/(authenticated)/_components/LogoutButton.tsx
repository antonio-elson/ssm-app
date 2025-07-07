'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { logout } from '../_actions/logout'

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogout() {
    setIsPending(true)
    setError(null)

    const result = await logout()

    setIsPending(false)

    if (result.success) {
      // Redirect to home page after successful logout
      router.push('/')
    } else {
      // Display error message
      setError(result.error || 'Logout failed')
    }
  }

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleLogout} disabled={isPending} className="text-white rounded">
        {isPending ? 'Logging out...' : 'logout'}
      </button>
    </>
  )
}
