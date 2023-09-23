import { handler } from '@/app/api/auth/[...nextauth]/route'
import RegisterForm from '@/components/RegisterForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function RegistroPage() {
  const session = await getServerSession(handler)

  if (session) redirect('/dashboard')

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <RegisterForm />
    </div>
  )
}
