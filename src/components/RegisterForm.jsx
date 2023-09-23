'use client'
import { dateFecha } from '@/app/helpers/fecha'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { z } from 'zod'

const init = {
  fullname: '',
  email: '',
  password: '',
}

export default function RegisterForm() {
  const router = useRouter()
  const [formValues, setformValues] = useState(init)
  const [error, setError] = useState(false)
  const [errorMesagge, setErrorMesagge] = useState('')
  const { fullname, email, password } = formValues

  const handleInput = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const handleubmit = async (e) => {
    e.preventDefault()

    const schema = z.object({
      fullname: z
        .string({
          required_error: 'Campo nombres es requerido',
          invalid_type_error: 'El campo debe ser solo letras',
        })
        .min(5, { message: 'El nombre debe tener al menos 5 caracteres' })
        .max(40, { message: 'El campo debe tener como maximo 40 caracteres' }),

      email: z
        .string({
          required_error: 'Campo email es requerido',
          invalid_type_error: 'El campo email debe llevar @',
        })
        .email({ message: 'Debe ingresar un email correcto' }),

      password: z
        .string()
        .min(4, { message: 'Su contraseña de tener al menos 4 caracteres' }),
    })

    try {
      const result = schema.safeParse(formValues)

      if (!result.success) {
        const { errors } = result.error
        setErrorMesagge(errors[0].message)
        setError(true)
        return
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, password }),
      })
      const data = await res.json()

      if (!data.ok) {
        setError(true)
        setErrorMesagge(data.msg)
        return
      }

      setError(true)
      setErrorMesagge(data.msg)
      setformValues(init)
      router.push('/auth/login')
    } catch (error) {
      setError(true)
      console.log(error)
      if (error instanceof Error) {
        return setErrorMesagge(error.msg)
      }
    } finally {
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return (
    <div className="w-full md:w-[350px] lg:w-[400px] px-5">
      <div className="p-5 text-gray-900 border-t-4 border-red-400 rounded-lg shadow-lg ">
        <h2 className="mb-5 font-semibold uppercase">Ingrese sus datos</h2>

        <form className="flex flex-col gap-3" onSubmit={handleubmit}>
          <label className="text-xs" htmlFor="fullname">
            Nombre completo
          </label>
          <input
            autoComplete="off"
            autoFocus
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Nombre completo"
            onChange={handleInput}
            value={fullname}
          />
          <label className="text-xs" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="off"
            type="email"
            name="email"
            id="email"
            placeholder="Ej. prueba@gmail.com"
            onChange={handleInput}
            value={email}
          />
          <label className="text-xs" htmlFor="password">
            Contraseña
          </label>
          <input
            autoComplete="off"
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

          <Link className="py-3 text-xs text-right" href={'/auth/login'}>
            Ya estas registrado? <span className="underline">Ingresar</span>
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
