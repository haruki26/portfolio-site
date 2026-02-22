import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'
import { getCertifications as getCertifications_ } from '@/cms/endpoints/certifications'
import { getHobbies as getHobbies_ } from '@/cms/endpoints/hobbies'
import { toSerializableResult } from '@/libs/result'

const _getCertifications = createServerOnlyFn(getCertifications_)
const getCertifications = createServerFn().handler(async () =>
  toSerializableResult(await _getCertifications()),
)

const _getHobbies = createServerOnlyFn(getHobbies_)
const getHobbies = createServerFn().handler(async () =>
  toSerializableResult(await _getHobbies()),
)

export { getCertifications, getHobbies }
