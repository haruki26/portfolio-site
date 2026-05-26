import { createServerFn } from '@tanstack/react-start'
import { getCMSClientMiddleware } from '@/integrations/cms/client'
import { tryAsync } from '@/libs/result'
import {
  getCertifications as _getCertifications,
  getHobbies as _getHobbies,
} from './index.server'

const getCertifications = createServerFn()
  .middleware([getCMSClientMiddleware])
  .handler(async ({ context: { getCMSClient } }) =>
    tryAsync(async () => _getCertifications(getCMSClient())),
  )

const getHobbies = createServerFn()
  .middleware([getCMSClientMiddleware])
  .handler(async ({ context: { getCMSClient } }) =>
    tryAsync(async () => _getHobbies(getCMSClient())),
  )

export { getCertifications, getHobbies }
