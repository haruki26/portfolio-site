import { appEnv } from "@/libs/env"
import { createCMSClient } from "@repo/cms"

export const cmsClient = createCMSClient({
  serviceDomain: appEnv.MICROCMS_SERVICE_DOMAIN,
  apiKey: appEnv.MICROCMS_API_KEY,
})
