'use client'
import { signOut } from 'next-auth/react'

export default function Dashboard() {
  return (
    <div className="container flex items-center justify-center min-h-screen mx-auto">
      <div className="p-5 border-t-2 border-red-500 rounded-lg shadow-lg">
        <h2 className="mb-3 text-right">Bienvenido!!!</h2>

        <p className="mb-2">
          User: <span className="font-bold">Miguel Angel</span>
        </p>
        <p className="mb-3">
          Email: <span className="font-bold">mickmigue05@gmai.com</span>
        </p>

        <button
          onClick={() => signOut()}
          className="w-full py-1 text-white bg-red-700 rounded-lg hover:bg-red-500"
        >
          Salir
        </button>
      </div>
    </div>
  )
}
