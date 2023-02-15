import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      })
    ],
    callbacks: {
      // async signIn({ user, account, profile, email, credentials }) {
      //   console.log('signIn | url: ', url)
      //   console.log('signIn | baseUrl: ', baseUrl)
      //   return true
      // },
      // async redirect({ url, baseUrl }) {
      //   console.log('redirect | url: ', url)
      //   console.log('redirect | baseUrl: ', baseUrl)
      //   return baseUrl
      // },
      session({ session }) {
        session.user.admin = session.user.email === process.env.GITHUB_ADMIN_EMAIL ? true : false
        return session
      }
    }
  })
}

// export const authOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET
//     })
//   ],
//   callbacks: {
//     session({ session }) {
//       session.user.admin = session.user.email === process.env.GITHUB_ADMIN_EMAIL ? true : false
//       return session
//     }
//   }
// }

// export default NextAuth(authOptions)
