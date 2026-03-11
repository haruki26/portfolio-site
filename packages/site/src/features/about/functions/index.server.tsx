import { createServerOnlyFn } from '@tanstack/react-start'
import { getCertifications as getCertifications_ } from '@/cms/endpoints/certifications'
import { getHobbies as getHobbies_ } from '@/cms/endpoints/hobbies'

const getCertifications = createServerOnlyFn(getCertifications_)
const getHobbies = createServerOnlyFn(getHobbies_)

export { getCertifications, getHobbies }
