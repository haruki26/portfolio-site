import { createCMSClient } from '@repo/cms'
import { createMiddleware } from '@tanstack/react-start'
import { appEnv } from '@/libs/env'

const cmsClient = createCMSClient({
  serviceDomain: appEnv.MICROCMS_SERVICE_DOMAIN,
  apiKey: appEnv.MICROCMS_API_KEY,
})

export const getCMSClientMiddleware = createMiddleware({
  type: 'function',
}).server(async ({ next }) => {
  return next({
    context: {
      getCMSClient: () => cmsClient,
    },
  })
})
