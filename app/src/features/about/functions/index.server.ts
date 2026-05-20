import { createServerOnlyFn } from '@tanstack/react-start'
import { cmsClient } from '@/integrations/cms/client'

const getCertifications = createServerOnlyFn(cmsClient.certifications.getList)
const getHobbies = createServerOnlyFn(cmsClient.hobbies.getList)

export { getCertifications, getHobbies }
