export default function Home() {
  return (
    <div className="w-full lg:grid  lg:grid-cols-5 min-h-screen flex sm:items-center sm:justify-center sm:grid">
      <div className="flex items-center justify-center py-12 col-span-2 px-8">
        <div className="mx-auto grid max-w-[540px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">Subscribe to our Newsletter!</h1>
            <p className="text-balance text-muted-foreground">
              Get the latest news, updates, and special offers delivered
              straight to your inbox.
            </p>
          </div>
          <form className="grid gap-4">{/* Newsletter form here */}</form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block col-span-3 min-h-screen bg-gradient-to-t from-green-50 via-pink-100 to-purple-100"></div>
    </div>
  )
}
