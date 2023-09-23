import { connectMongoDB } from '@/libs/mongoDB'
import User from '@/models/user'
import NextAuth from 'next-auth'
import bcrypt from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'webmaick' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials
        await connectMongoDB()

        try {
          const user = await User.findOne({ email })

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            const passValidate = bcrypt.compareSync(password, user.password)

            if (!passValidate) return null

            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          console.log(error)
        }
      },
    }),
  ],
  session: {
    strategy: true,
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }
