import { useRouter } from 'next/navigation'
import React, { ReactElement, useState } from 'react'

interface SubmitButtonProps {
  loading: boolean
  text: string
}

export default function SubmitButton({ loading, text }: SubmitButtonProps): ReactElement {
  return (
    <button
      className="bg-white text-black rounded-md p-2 w-full mt-6"
      type="submit"
      disabled={loading}
    >
      {loading ? 'loading...' : text}
    </button>
  )
}
