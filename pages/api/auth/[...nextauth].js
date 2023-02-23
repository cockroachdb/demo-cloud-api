import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    session({ session }) {
      session.user.admin = session.user.email === process.env.GITHUB_ADMIN_EMAIL ? true : false
      return session
    }
  }
}

export default (req, res) => {
  if (process.env.VERCEL) {
    // prefer NEXTAUTH_URL, fallback to x-forwarded-host
    req.headers['x-forwarded-host'] = process.env.NEXTAUTH_URL || req.headers['x-forwarded-host']
  }
  return NextAuth(req, res, authOptions) // eslint-disable-line new-cap
}
