import type { CMSClient } from '@repo/cms'
import { createServerOnlyFn } from '@tanstack/react-start'

const getCertifications = createServerOnlyFn((client: CMSClient) =>
  client.certifications.getList(),
)
const getHobbies = createServerOnlyFn((client: CMSClient) =>
  client.hobbies.getList(),
)

export { getCertifications, getHobbies }
