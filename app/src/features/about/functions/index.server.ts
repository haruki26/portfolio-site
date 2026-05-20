import { cmsClient } from '@/integrations/cms/client'
import { createServerOnlyFn } from '@tanstack/react-start'

const getCertifications = createServerOnlyFn(cmsClient.certifications.getList)
const getHobbies = createServerOnlyFn(cmsClient.hobbies.getList)

export { getCertifications, getHobbies }
