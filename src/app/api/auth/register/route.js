import { connectMongoDB } from '@/libs/mongoDB'
import User from '@/models/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export const POST = async (req) => {
  const { fullname, email, password } = await req.json()

  try {
    // Coneccion a la BD
    await connectMongoDB()

    const usuario = await User.findOne({ email })

    if (usuario) {
      return NextResponse.json({
        ok: false,
        msg: 'El correo ya se encuentra registrado',
      })
    }

    // encrypatamos el password
    const salt = bcrypt.genSaltSync()
    const newPass = bcrypt.hashSync(password, salt)

    // creamos el usuaro
    const userRegister = new User({
      fullname,
      email,
      password: newPass,
    })

    const saveUser = await userRegister.save()

    return NextResponse.json({
      ok: true,
      msg: 'Usuario registrado correctamente',
      saveUser,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      msg: 'Cosulte con el administrado de sistemas.',
    })
  }
}
