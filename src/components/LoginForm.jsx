'use client'
import { dateFecha } from '@/app/helpers/fecha'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const init = {
  email: '',
  password: '',
}

export default function LoginForm() {
  const [error, setError] = useState(false)
  const router = useRouter()
  const [formValues, setformValues] = useState(init)
  const [errorMesagge, setErrorMesagge] = useState('')
  const { email, password } = formValues

  const handleInput = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res.error) {
        setError('Email o Password invalidaos')
        return
      }

      router.replace('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full md:w-[350px] lg:w-[400px] px-5">
      <div className="p-5 text-gray-900 border-t-4 border-red-400 rounded-lg shadow-lg ">
        <h2 className="mb-5 font-semibold uppercase">Ingrese sus datos</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-xs" htmlFor="nombre">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Ej. prueba@gmail.com"
            onChange={handleInput}
            value={email}
          />
          <label className="text-xs" htmlFor="nombre">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleInput}
            value={password}
          />

          <button className="py-2 mt-3 text-white rounded-lg bg-gray-950 hover:bg-gray-900">
            Ingresar
          </button>

          {error && (
            <span className="px-2 py-1 text-[12px] md:text-[10px] font-bold text-red-500 rounded-sm w-fit">
              {errorMesagge}
            </span>
          )}

          <Link className="py-3 text-xs text-right" href={'/auth/register'}>
            No estas registrado? <span className="underline">Registrarse</span>
          </Link>

          <div className="flex justify-between mt-2">
            <p className="text-[10px]">
              <span>[ </span>Frente de Unidad del Magisterio <span>]</span>
            </p>
            <small className="text-[10px]">@{dateFecha()}</small>
          </div>
        </form>
      </div>
    </div>
  )
}
