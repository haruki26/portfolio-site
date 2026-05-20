import { createServerFn } from '@tanstack/react-start'
import {
  getCertifications as _getCertifications,
  getHobbies as _getHobbies,
} from './index.server'
import { tryAsync } from '@/libs/result'

const getCertifications = createServerFn().handler(async () => tryAsync(_getCertifications))
const getHobbies = createServerFn().handler(async () => tryAsync(_getHobbies))

export { getCertifications, getHobbies }
