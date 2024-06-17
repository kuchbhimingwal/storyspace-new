
import client from "@/db"
import bcrypt from "bcrypt";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authProvider = {
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
            const hasedPassword = await bcrypt.hash(credentials.password, 10);
            const user = await client.user.findUnique({
              where:{
                email: credentials.email
              }
            })
            if(user){
              const vlidatingpass = await bcrypt.compare(credentials.password, user.password)
              if(vlidatingpass){
                return user
              } else {
                return null
              }
            }
            return null
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
      // TODO: can u fix the type here? Using any is bad
      async session({ token, session }: any) {
          session.user.id = token.sub,
          session.user.name = token.name

          return session
      }
  },
  pages: {
    signIn: '/signin',
  },
}