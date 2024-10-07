'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Manifest from '@mnfst/sdk'

export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Retrieve the email from the input field
    const form = e.currentTarget as HTMLFormElement
    const emailInput = form.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement
    const email = emailInput?.value

    // New state for alert visibility
    const [alertVisible, setAlertVisible] = useState(false)

    if (!email) {
      alert('Please enter a valid email.')
      return
    }

    const manifest = new Manifest()
    manifest
      .from('subscribers')
      .create({ email })
      .then(() => {
        form.reset() // Reset the email field after submission
        alert('Successfully subscribed!')
      })
      .catch((error) => {
        console.error('Error adding subscriber:', error)
        alert(`Failed to add subscriber: ${error.message || error}`)
      })
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-5 min-h-screen flex sm:items-center sm:justify-center sm:grid">
      <div className="flex items-center justify-center py-12 col-span-2 px-8">
        <div className="mx-auto grid max-w-[540px] gap-6">
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
              {/* Retirer toute référence à value={email} et onChange */}
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
            {alertVisible && (
              <Alert className="bg-teal-300 border-teal-400 text-teal-800">
                <AlertTitle>Applied</AlertTitle>
                <AlertDescription>
                  Thank you for your submission! 🎉 See you soon!
                </AlertDescription>
              </Alert>
            )}
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block col-span-3 min-h-screen bg-gradient-to-t from-green-50 via-pink-100 to-purple-100"></div>
    </div>
  )
}
