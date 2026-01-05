import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1f] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <CheckCircle className="w-20 h-20 text-amber-400 mx-auto" />
        <h1 className="text-4xl font-bold text-white">Payment Successful!</h1>
        <p className="text-xl text-gray-300">Your cosmic blueprint is being prepared.</p>
        <p className="text-gray-400">
          You will receive your personalized report via email within the next few minutes. Check your inbox and spam
          folder.
        </p>
        <Button asChild className="bg-amber-500 hover:bg-amber-600 text-[#0a0a1f]">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
