import { createCMSClient } from '@repo/cms'
import { appEnv } from '@/libs/env'

export const cmsClient = createCMSClient({
  serviceDomain: appEnv.MICROCMS_SERVICE_DOMAIN,
  apiKey: appEnv.MICROCMS_API_KEY,
})
