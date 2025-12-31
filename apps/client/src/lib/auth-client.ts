import { createAuthClient } from 'better-auth/react'
import { passkeyClient } from '@better-auth/passkey/client'
import {
  jwtClient,
  oneTapClient,
  usernameClient,
} from 'better-auth/client/plugins'
import { env } from '@/env'

export const authClient = createAuthClient({
  baseURL: env.VITE_SERVER_URL,
  plugins: [
    passkeyClient(),
    usernameClient(),
    jwtClient(),
    oneTapClient({
      clientId: 'YOUR_CLIENT_ID',
      autoSelect: false,
      cancelOnTapOutside: true,
      context: 'signin',
      additionalOptions: {},
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5,
      },
    }),
  ],
})

export const { signIn, signOut, signUp, useSession } = authClient
