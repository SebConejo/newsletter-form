'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Manifest from '@mnfst/sdk'
import { useEffect, useState } from 'react'

export default function Home() {
  const [alertVisible, setAlertVisible] = useState(false) // State to manage alert visibility
  const [alertMessage, setAlertMessage] = useState('') // Message to display in the alert
  const [isClient, setIsClient] = useState(false) // State to check if the component is rendering on the client

  useEffect(() => {
    // Set isClient to true only when rendered on the client
    setIsClient(true)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Retrieve email from the input field
    const form = e.currentTarget as HTMLFormElement
    const emailInput = form.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement
    const email = emailInput?.value

    if (!email) {
      setAlertMessage('Please enter a valid email.')
      setAlertVisible(true)
      setTimeout(() => setAlertVisible(false), 3000) // Hide the alert after 3 seconds
      return
    }

    const manifest = new Manifest()
    manifest
      .from('subscribers')
      .create({ email })
      .then(() => {
        form.reset() // Reset the email input field after success
        setAlertMessage(
          'Successfully subscribed! We will contact you if you are selected.'
        )
        setAlertVisible(true) // Show success alert
        setTimeout(() => setAlertVisible(false), 3000) // Hide the alert after 3 seconds
      })
      .catch((error) => {
        setAlertMessage(`Failed to add subscriber: ${error.message || error}`)
        setAlertVisible(true) // Show error alert
        setTimeout(() => setAlertVisible(false), 3000) // Hide the alert after 3 seconds
      })
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-5 min-h-screen flex sm:items-center sm:justify-center sm:grid">
      <div className="flex items-center justify-center py-12 col-span-2 px-8">
        <div className="relative mx-auto grid max-w-[540px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">
              Subscribe to our Newsletter! 💌
            </h1>
            <p className="text-balance text-muted-foreground">
              Get the latest news, updates, and special offers delivered
              straight to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="m@example.com"
                name="email"
                required
              />
              <Button type="submit">Subscribe</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Sent out weekly on Mondays. Always free.
            </p>
          </form>
          {/* Display the alert only if rendered on client-side */}
          {isClient && alertVisible && (
            <Alert className="absolute bottom-[-90px] bg-teal-300 border-teal-400 text-teal-800">
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
      <div className="hidden bg-muted lg:block col-span-3 min-h-screen bg-gradient-to-t from-green-50 via-pink-100 to-purple-100"></div>
    </div>
  )
}
